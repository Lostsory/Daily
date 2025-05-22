import { useCallback, useEffect, useRef, useState } from 'react';
import { CustomElement } from './Editor';

interface CommandMenuProps {
  search: string;
  onSelect: (type: CustomElement['type']) => void;
}

const COMMANDS = [
  { type: 'block' as const, label: '块级容器', description: '独占一行的容器' },
  { type: 'inline-block' as const, label: '行内容器', description: '可以和其他元素在同一行的容器' },
] as const;

export default function CommandMenu({ search, onSelect }: CommandMenuProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const menuRef = useRef<HTMLDivElement>(null);

  const filteredCommands = COMMANDS.filter((command) =>
    command.label.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    setSelectedIndex(0);
  }, [search]);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === 'ArrowDown') {
        event.preventDefault();
        setSelectedIndex((index) => (index + 1) % filteredCommands.length);
      } else if (event.key === 'ArrowUp') {
        event.preventDefault();
        setSelectedIndex((index) => (index - 1 + filteredCommands.length) % filteredCommands.length);
      } else if (event.key === 'Enter') {
        event.preventDefault();
        onSelect(filteredCommands[selectedIndex].type);
      }
    },
    [filteredCommands, selectedIndex, onSelect]
  );

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  if (filteredCommands.length === 0) {
    return null;
  }

  return (
    <div
      ref={menuRef}
      className="absolute z-10 mt-1 w-64 bg-white rounded-md shadow-lg border border-gray-200"
    >
      {filteredCommands.map((command, index) => (
        <div
          key={command.type}
          className={`p-2 cursor-pointer ${
            index === selectedIndex ? 'bg-gray-100' : 'hover:bg-gray-50'
          }`}
          onClick={() => onSelect(command.type)}
        >
          <div className="font-medium">{command.label}</div>
          <div className="text-sm text-gray-500">{command.description}</div>
        </div>
      ))}
    </div>
  );
}
