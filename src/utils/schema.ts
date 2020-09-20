import { normalize, schema } from 'normalizr';

// const attribute = new schema.Entity('attribute');
const block = new schema.Entity('block', {}, { idAttribute: 'cId' });
const page = new schema.Entity(
  'pages',
  {
    pluginItem: [block],
  },
  { idAttribute: 'cId' },
);
const pageList = [page];

export default pageList;
