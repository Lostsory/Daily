const db = require('./db');
const { generateVectorByComponent } = require('./generateVector');
const demoData = require('./demo');

const insertComponent = db.prepare(`
  INSERT OR REPLACE INTO components (id, name, description, preview_url, structure_json, vector)
  VALUES (@id, @name, @description, @preview_url, @structure_json, @vector)
`);

const insertProp = db.prepare(`
  INSERT INTO props (component_id, name, type, description, required)
  VALUES (@component_id, @name, @type, @description, @required)
`);

const addComponent = async(component) => {
  const vector = await generateVectorByComponent(component)
  const info = {
    ...component,
    vector: JSON.stringify(vector),
  }
  // 插入组件
  insertComponent.run(info);

  // 插入 props
  const insertMany = db.transaction((props) => {
    props.forEach(p => insertProp.run({ ...p, component_id: component.id }));
  });
  insertMany(component.props);

  console.log('✅ Inserted component and its props.');
};

const demo = {
  id: 'btn-primary',
  name: 'PrimaryButton',
  description: 'A primary button for main actions',
  preview_url: '/images/btn-primary.png',
  structure_json: JSON.stringify({
    type: 'Button',
    children: ['Click Me'],
    props: { type: 'primary', size: 'medium' },
  }),
  props: [
    { name: 'type', type: 'string', description: '按钮类型', required: 1 },
    { name: 'size', type: 'string', description: '按钮大小', required: 0 },
    { name: 'disabled', type: 'boolean', description: '是否禁用', required: 0 }
  ]
};

demoData.forEach((item) => {
  addComponent(item);
})






