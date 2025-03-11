export function parseJson(jsonString: string) {
  try {
    // Check if the input is empty
    if (!jsonString || jsonString.trim() === '') {
      return {
        success: false,
        data: null,
        error: 'File content is empty'
      }
    }

    const cleanJson = jsonString
      .replace(/\/\*[\s\S]*?\*\/|([^\\:]|^)\/\/.*$/gm, '$1')
      .trim()
    
    if (!cleanJson.startsWith('{') && !cleanJson.startsWith('[')) {
      return {
        success: false,
        data: null,
        error: 'File content is not a valid JSON format'
      }
    }

    const parsed = JSON.parse(cleanJson)
    return {
      success: true,
      data: parsed,
      error: null
    }
  } catch (e) {
    return {
      success: false,
      data: null,
      error: e instanceof Error ? e.message : 'Error parsing JSON'
    }
  }
}

export function stringifyJson(json: unknown, space = 2) {
  try {
    return {
      success: true,
      data: JSON.stringify(json, null, space),
      error: null
    }
  } catch (e) {
    return {
      success: false,
      data: null,
      error: e instanceof Error ? e.message : 'Error serializing JSON'
    }
  }
}

// Validate JSON size
export function validateJsonSize(json: unknown, maxSize = 10 * 1024 * 1024) {
  const size = new Blob([JSON.stringify(json)]).size
  return size <= maxSize
}

// Check JSON encoding
export function detectJsonEncoding(buffer: ArrayBuffer): string {
  const arr = new Uint8Array(buffer).subarray(0, 4)
  let encoding = 'utf-8'
  
  if (arr[0] === 0xEF && arr[1] === 0xBB && arr[2] === 0xBF) {
    encoding = 'utf-8'
  } else if (arr[0] === 0xFE && arr[1] === 0xFF) {
    encoding = 'utf-16be'
  } else if (arr[0] === 0xFF && arr[1] === 0xFE) {
    encoding = 'utf-16le'
  }

  return encoding
}

interface ChunkOptions {
  maxKeys?: number;        // Maximum number of key-value pairs per block
  maxSize?: number;        // Maximum number of bytes per block
  preserveStructure?: boolean; // Whether to preserve object structure
}

export function chunkJsonObject(
  obj: Record<string, any>, 
  options: ChunkOptions = {}
) {
  const {
    maxKeys = 50,
    maxSize = 4000, // Approximately 4KB
    preserveStructure = true
  } = options;
  
  const chunks: Array<Record<string, any>> = [];
  let currentChunk: Record<string, any> = {};
  let currentSize = 0;
  let currentKeys = 0;
  
  // Recursively process nested objects
  function processObject(obj: Record<string, any>, path: string[] = []) {
    for (const [key, value] of Object.entries(obj)) {
      const currentPath = [...path, key];
      
      if (typeof value === 'object' && value !== null && preserveStructure) {
        // If it's an object and structure needs to be preserved, recursively process
        processObject(value, currentPath);
        continue;
      }
      
      // Calculate the size of the current key-value pair
      const entrySize = new Blob([JSON.stringify({ [key]: value })]).size;
      
      // If the current block is full, create a new block
      if (currentKeys >= maxKeys || currentSize + entrySize > maxSize) {
        if (Object.keys(currentChunk).length > 0) {
          chunks.push(currentChunk);
          currentChunk = {};
          currentSize = 0;
          currentKeys = 0;
        }
      }
      
      // Add the key-value pair to the current block
      if (path.length === 0) {
        currentChunk[key] = value;
      } else {
        // Process nested paths
        let target = currentChunk;
        for (let i = 0; i < path.length; i++) {
          const pathKey = path[i];
          if (i === path.length - 1) {
            target[pathKey] = target[pathKey] || {};
            target[pathKey][key] = value;
          } else {
            target[pathKey] = target[pathKey] || {};
            target = target[pathKey];
          }
        }
      }
      
      currentSize += entrySize;
      currentKeys++;
    }
  }
  
  processObject(obj);
  
  // Add the last block
  if (Object.keys(currentChunk).length > 0) {
    chunks.push(currentChunk);
  }
  
  return chunks;
}

// Merge translated results while preserving object structure
export function mergeTranslatedChunks(chunks: Record<string, any>[]) {
  return chunks.reduce((acc, chunk) => {
    function deepMerge(target: any, source: any) {
      for (const key in source) {
        if (typeof source[key] === 'object' && source[key] !== null) {
          target[key] = target[key] || {};
          deepMerge(target[key], source[key]);
        } else {
          target[key] = source[key];
        }
      }
      return target;
    }
    return deepMerge(acc, chunk);
  }, {});
} 