import { useSlate } from 'slate-react';
import { Editor, Element as SlateElement, Transforms } from 'slate';
import { CustomElement } from './Editor';

interface ToolbarButtonProps {
  active: boolean;
  onMouseDown: (event: React.MouseEvent) => void;
  children: React.ReactNode;
}

const ToolbarButton = ({ active, onMouseDown, children }: ToolbarButtonProps) => (
  <button
    className={`p-2 rounded ${
      active ? 'bg-gray-200' : 'hover:bg-gray-100'
    }`}
    onMouseDown={onMouseDown}
  >
    {children}
  </button>
);

export default function Toolbar() {
  const editor = useSlate();

  const toggleBlock = (format: CustomElement['type']) => {
    const isActive = isBlockActive(editor, format);

    const newProperties: Partial<SlateElement> = {
      type: isActive ? 'block' : format,
    };

    Transforms.setNodes(editor, newProperties);
  };

  return (
    <div className="border-b p-2 flex gap-2">
      <ToolbarButton
        active={isBlockActive(editor, 'block')}
        onMouseDown={(e) => {
          e.preventDefault();
          toggleBlock('block');
        }}
      >
        块级元素
      </ToolbarButton>
      <ToolbarButton
        active={isBlockActive(editor, 'inline-block')}
        onMouseDown={(e) => {
          e.preventDefault();
          toggleBlock('inline-block');
        }}
      >
        行内块元素
      </ToolbarButton>
    </div>
  );
}

const isBlockActive = (editor: Editor, format: CustomElement['type']) => {
  const { selection } = editor;
  if (!selection) return false;

  const [match] = Array.from(
    Editor.nodes(editor, {
      at: Editor.unhangRange(editor, selection),
      match: (n) =>
        !Editor.isEditor(n) && SlateElement.isElement(n) && n.type === format,
    })
  );

  return !!match;
};
