import { getNested } from "../../utils/helpers";
import "./styles.css";

function TileHeaders({ columns, hasActions }) {
  return (
    <div className="tile-headers">
      {columns?.map((col, idx) => (
        <div className="tile-header" key={idx}>
          <span>{col}</span>
        </div>
      ))}
      {!hasActions ? null : (
        <div className="tile-header">
          <span>Actions</span>
        </div>
      )}
    </div>
  );
}

function TileRow({ columns, actions, item, idx }) {
  const hasActions = actions.length > 0;
  return (
    <div className="tile-row" key={idx}>
      {columns?.map((col) => (
        <div className={col.class ? `tile ${col.class}` : "tile"}>
          {col.formatter
            ? col.formatter(getNested(item, col.key))
            : getNested(item, col.key)}
        </div>
      ))}
      {!hasActions ? null : (
        <div className="tile actions">
          {actions?.map((act) => (
            <div
              className={`action ${act.class || ""}`}
              onClick={(e) => {
                act.handler(item);
              }}
            >
              {act.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function TileDataContent({ columns, data, actions }) {
  return (
    <div className="tiles-data-content">
      {data?.map((item, idx) => (
        <TileRow columns={columns} item={item} actions={actions} idx={idx} />
      ))}
    </div>
  );
}

export default function TileComponent(props) {
  const { records, actions } = props;
  const columns = props.columns.map((col) => col.name);
  const hasActions = actions.length > 0;

  return (
    <div className="tiles">
      <TileHeaders columns={columns} hasActions={hasActions} />
      <TileDataContent
        columns={props.columns}
        data={records}
        actions={actions}
      />
    </div>
  );
}
