import { useMemo, useCallback, useState, useRef } from 'react';
import { createEditor, Descendant, BaseEditor, Editor, Range, Transforms } from 'slate';
import { Slate, Editable, withReact, RenderElementProps, RenderLeafProps, ReactEditor } from 'slate-react';
import { withHistory, HistoryEditor } from 'slate-history';
import Toolbar from './Toolbar';
import CommandMenu from './CommandMenu';

// 定义自定义元素类型
export type CustomElement = {
  type: 'block' | 'inline-block';
  children: CustomText[];
};

// 定义自定义文本类型
export type CustomText = {
  text: string;
};

// 合并类型
declare module 'slate' {
  interface CustomTypes {
    Editor: BaseEditor & ReactEditor & HistoryEditor;
    Element: CustomElement;
    Text: CustomText;
  }
}

// 默认编辑器内容
const initialValue: Descendant[] = [
  {
    type: 'block',
    children: [{ text: '开始编辑...' }],
  },
];

// 渲染元素组件
const Element = ({ attributes, children, element }: RenderElementProps) => {
  switch (element.type) {
    case 'block':
      return <div {...attributes} className="mb-4">{children}</div>;
    case 'inline-block':
      return <span {...attributes} className="inline-block bg-gray-100 px-2 py-1 rounded">{children}</span>;
    default:
      return <p {...attributes}>{children}</p>;
  }
};

// 渲染叶子节点组件
const Leaf = ({ attributes, children }: RenderLeafProps) => {
  return <span {...attributes}>{children}</span>;
};

export default function EditorComponent() {
  const editor = useMemo(() => withHistory(withReact(createEditor())), []);
  const [target, setTarget] = useState<Range | null>(null);
  const [search, setSearch] = useState('');
  const menuRef = useRef<HTMLDivElement>(null);
  const editorRef = useRef<HTMLDivElement>(null);

  const renderElement = useCallback((props: RenderElementProps) => <Element {...props} />, []);
  const renderLeaf = useCallback((props: RenderLeafProps) => <Leaf {...props} />, []);

  const onKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      if (event.key === '/') {
        const { selection } = editor;
        if (selection && Range.isCollapsed(selection)) {
          const [start] = Range.edges(selection);
          const wordBefore = Editor.before(editor, start, { unit: 'word' });
          const before = wordBefore && Editor.before(editor, wordBefore);
          const beforeRange = before && Editor.range(editor, before, start);
          const beforeText = beforeRange && Editor.string(editor, beforeRange);
          const beforeMatch = beforeText && beforeText.match(/^\/(\w+)$/);

          if (beforeMatch) {
            event.preventDefault();
            setTarget(beforeRange);
            setSearch(beforeMatch[1]);
            return;
          }
        }
      }

      if (target) {
        if (event.key === 'Escape') {
          event.preventDefault();
          setTarget(null);
          return;
        }
      }
    },
    [editor, target]
  );

  const onChange = useCallback(
    () => {
      const { selection } = editor;
      if (selection && Range.isCollapsed(selection)) {
        const [start] = Range.edges(selection);
        const wordBefore = Editor.before(editor, start, { unit: 'word' });
        const before = wordBefore && Editor.before(editor, wordBefore);
        const beforeRange = before && Editor.range(editor, before, start);
        const beforeText = beforeRange && Editor.string(editor, beforeRange);
        const beforeMatch = beforeText && beforeText.match(/^\/(\w+)$/);

        if (beforeMatch) {
          setTarget(beforeRange);
          setSearch(beforeMatch[1]);
          return;
        }
      }
      setTarget(null);
    },
    [editor]
  );

  const insertNode = useCallback(
    (type: CustomElement['type']) => {
      if (target) {
        Transforms.select(editor, target);
        Transforms.delete(editor);
        const newNode = {
          type,
          children: [{ text: '' }],
        };
        Transforms.insertNodes(editor, newNode);
        setTarget(null);
      }
    },
    [editor, target]
  );

  const getMenuPosition = useCallback(() => {
    if (!target || !editorRef.current) return { top: 0, left: 0 };

    const domRange = window.getSelection()?.getRangeAt(0);
    if (!domRange) return { top: 0, left: 0 };

    const rect = domRange.getBoundingClientRect();
    const editorRect = editorRef.current.getBoundingClientRect();

    return {
      top: rect.top - editorRect.top + rect.height,
      left: rect.left - editorRect.left,
    };
  }, [target]);

  return (
    <div className="max-w-4xl mx-auto">
      <Slate editor={editor} initialValue={initialValue} onChange={onChange}>
        <Toolbar />
        <div ref={editorRef} className="border rounded-lg p-4 min-h-[300px] mt-4 relative">
          <Editable
            renderElement={renderElement}
            renderLeaf={renderLeaf}
            placeholder="输入 / 显示命令菜单..."
            spellCheck
            autoFocus
            className="outline-none"
            onKeyDown={onKeyDown}
          />
          {target && (
            <div
              ref={menuRef}
              style={getMenuPosition()}
              className="absolute"
            >
              <CommandMenu search={search} onSelect={insertNode} />
            </div>
          )}
        </div>
      </Slate>
    </div>
  );
}
