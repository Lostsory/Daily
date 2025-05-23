import { css } from '@emotion/css'
import React, { useCallback, useMemo } from 'react'
import { Transforms, createEditor } from 'slate'
import { withHistory } from 'slate-history'
import { jsx } from 'slate-hyperscript'
import {
  Editable,
  Slate,
  useFocused,
  useSelected,
  withReact,
} from 'slate-react'

const ELEMENT_TAGS = {
  A: el => ({ type: 'link', url: el.getAttribute('href') }),
  BLOCKQUOTE: () => ({ type: 'block-quote' }),
  H1: () => ({ type: 'heading-one' }),
  H2: () => ({ type: 'heading-two' }),
  H3: () => ({ type: 'heading-three' }),
  H4: () => ({ type: 'heading-four' }),
  H5: () => ({ type: 'heading-five' }),
  H6: () => ({ type: 'heading-six' }),
  IMG: el => ({ type: 'image', url: el.getAttribute('src') }),
  LI: () => ({ type: 'list-item' }),
  OL: () => ({ type: 'numbered-list' }),
  P: () => ({ type: 'paragraph' }),
  PRE: () => ({ type: 'code-block' }),
  UL: () => ({ type: 'bulleted-list' }),
}
const TEXT_TAGS = {
  CODE: () => ({ code: true }),
  DEL: () => ({ strikethrough: true }),
  EM: () => ({ italic: true }),
  I: () => ({ italic: true }),
  S: () => ({ strikethrough: true }),
  STRONG: () => ({ bold: true }),
  U: () => ({ underline: true }),
}
export const deserialize = el => {
  if (el.nodeType === 3) {
    return el.textContent
  } else if (el.nodeType !== 1) {
    return null
  } else if (el.nodeName === 'BR') {
    return '\n'
  }
  const { nodeName } = el
  let parent = el
  if (
    nodeName === 'PRE' &&
    el.childNodes[0] &&
    el.childNodes[0].nodeName === 'CODE'
  ) {
    parent = el.childNodes[0]
  }
  let children = Array.from(parent.childNodes).map(deserialize).flat()
  if (children.length === 0) {
    children = [{ text: '' }]
  }
  if (el.nodeName === 'BODY') {
    return jsx('fragment', {}, children)
  }
  if (ELEMENT_TAGS[nodeName]) {
    const attrs = ELEMENT_TAGS[nodeName](el)
    return jsx('element', attrs, children)
  }
  if (TEXT_TAGS[nodeName]) {
    const attrs = TEXT_TAGS[nodeName]()
    return children.map(child => jsx('text', attrs, child))
  }
  return children
}
const PasteHtmlExample = () => {
  const renderElement = useCallback(props => <Element {...props} />, [])
  const renderLeaf = useCallback(props => <Leaf {...props} />, [])
  const editor = useMemo(
    () => withHtml(withReact(withHistory(createEditor()))),
    []
  )
  return (
    <Slate editor={editor} initialValue={initialValue}>
      <Editable
        renderElement={renderElement}
        renderLeaf={renderLeaf}
        placeholder="Paste in some HTML..."
      />
    </Slate>
  )
}
const withHtml = editor => {
  const { insertData, isInline, isVoid } = editor
  editor.isInline = element => {
    return element.type === 'link' ? true : isInline(element)
  }
  editor.isVoid = element => {
    return element.type === 'image' ? true : isVoid(element)
  }
  editor.insertData = data => {
    const html = data.getData('text/html')
    if (html) {
      const parsed = new DOMParser().parseFromString(html, 'text/html')
      const fragment = deserialize(parsed.body)
      Transforms.insertFragment(editor, fragment)
      return
    }
    insertData(data)
  }
  return editor
}
const Element = props => {
  const { attributes, children, element } = props
  switch (element.type) {
    default:
      return <p {...attributes}>{children}</p>
    case 'block-quote':
      return <blockquote {...attributes}>{children}</blockquote>
    case 'code-block':
      return (
        <pre>
          <code {...attributes}>{children}</code>
        </pre>
      )
    case 'bulleted-list':
      return <ul {...attributes}>{children}</ul>
    case 'heading-one':
      return <h1 {...attributes}>{children}</h1>
    case 'heading-two':
      return <h2 {...attributes}>{children}</h2>
    case 'heading-three':
      return <h3 {...attributes}>{children}</h3>
    case 'heading-four':
      return <h4 {...attributes}>{children}</h4>
    case 'heading-five':
      return <h5 {...attributes}>{children}</h5>
    case 'heading-six':
      return <h6 {...attributes}>{children}</h6>
    case 'list-item':
      return <li {...attributes}>{children}</li>
    case 'numbered-list':
      return <ol {...attributes}>{children}</ol>
    case 'link':
      return (
        <SafeLink href={element.url} attributes={attributes}>
          {children}
        </SafeLink>
      )
    case 'image':
      return <ImageElement {...props} />
  }
}
const allowedSchemes = ['http:', 'https:', 'mailto:', 'tel:']
const SafeLink = ({ children, href, attributes }) => {
  const safeHref = useMemo(() => {
    let parsedUrl = null
    try {
      parsedUrl = new URL(href)
      // eslint-disable-next-line no-empty
    } catch {}
    if (parsedUrl && allowedSchemes.includes(parsedUrl.protocol)) {
      return parsedUrl.href
    }
    return 'about:blank'
  }, [href])
  return (
    <a href={safeHref} {...attributes}>
      {children}
    </a>
  )
}
const ImageElement = ({ attributes, children, element }) => {
  const selected = useSelected()
  const focused = useFocused()
  return (
    <div {...attributes}>
      {children}
      <img
        src={element.url}
        className={css`
          display: block;
          max-width: 100%;
          max-height: 20em;
          box-shadow: ${selected && focused ? '0 0 0 2px blue;' : 'none'};
        `}
      />
    </div>
  )
}
const Leaf = ({ attributes, children, leaf }) => {
  if (leaf.bold) {
    children = <strong>{children}</strong>
  }
  if (leaf.code) {
    children = <code>{children}</code>
  }
  if (leaf.italic) {
    children = <em>{children}</em>
  }
  if (leaf.underline) {
    children = <u>{children}</u>
  }
  if (leaf.strikethrough) {
    children = <del>{children}</del>
  }
  return <span {...attributes}>{children}</span>
}
const initialValue = [
  {
    type: 'paragraph',
    children: [
      {
        text: "By default, pasting content into a Slate editor will use the clipboard's ",
      },
      { text: "'text/plain'", code: true },
      {
        text: " data. That's okay for some use cases, but sometimes you want users to be able to paste in content and have it maintain its formatting. To do this, your editor needs to handle ",
      },
      { text: "'text/html'", code: true },
      { text: ' data. ' },
    ],
  },
  {
    type: 'paragraph',
    children: [{ text: 'This is an example of doing exactly that!' }],
  },
  {
    type: 'paragraph',
    children: [
      {
        text: "Try it out for yourself! Copy and paste some rendered HTML rich text content (not the source code) from another site into this editor and it's formatting should be preserved.",
      },
    ],
  },
]
export default PasteHtmlExample
