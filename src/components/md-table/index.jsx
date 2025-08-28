import React from 'react';

function MdTable({ rowEmit, columns, data }) {
  return (
    <div className="markdown">
      <div className="dumi-default-table">
        <div className="dumi-default-table-content">
          <table style={{ margin: 0 }}>
            <thead>
              <tr>
                {columns.map((col, i) => (
                  <th key={col?.key || `${i}`}>{col.title}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => {
                const result = rowEmit(item);
                return (
                  <tr key={`${index}`}>
                    {columns.map((col, j) => {
                      const val = item?.[col?.key || ''];
                      return (
                        <td key={col?.key || `${index}-${j}`}>
                          {!col.render ? val : col.render({ val, result, item, index })}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default MdTable;
