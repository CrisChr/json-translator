import { FixedSizeList as List } from 'react-window';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { memo, useMemo } from 'react';

interface VirtualizedJsonProps {
  content: string;
  height: number;
  width: number;
  showLineNumbers?: boolean;
}

const LINE_HEIGHT = 21;

const VirtualizedJson = memo(({ content, height, width, showLineNumbers = true }: VirtualizedJsonProps) => {
  const lines = useMemo(() => content.split('\n'), [content]);

  const Row = ({ index, style }: { index: number; style: React.CSSProperties }) => {
    const line = lines[index];
    
    return (
      <div 
        style={{
          ...style,
          width: '100%',
          overflow: 'hidden'
        }}
        className="bg-[#282c34]"
      >
        <SyntaxHighlighter
          language="json"
          style={oneDark}
          showLineNumbers={showLineNumbers}
          startingLineNumber={index + 1}
          customStyle={{
            margin: 0,
            padding: '0 16px',
            background: 'transparent',
            fontSize: '14px',
            overflow: 'hidden',
          }}
          wrapLines={true}
          wrapLongLines={true}
        >
          {line}
        </SyntaxHighlighter>
      </div>
    );
  };

  return (
    <div className="overflow-hidden rounded-[1rem] bg-[#282c34] mb-3">
      <List
        height={height}
        itemCount={lines.length}
        itemSize={LINE_HEIGHT}
        width={width}
        className="virtual-list scrollbar-custom"
      >
        {Row}
      </List>
    </div>
  );
});

VirtualizedJson.displayName = 'VirtualizedJson';

export default VirtualizedJson; 