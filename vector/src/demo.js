module.exports = [
  {
    id: 'btn-primary',
    name: 'PrimaryButton',
    description: '用于主操作的主要按钮',
    preview_url: '/images/btn-primary.png',
    structure_json: JSON.stringify({
      type: 'Button',
      children: ['Click Me'],
      props: { type: 'primary', size: 'medium' },
    }),
    props: [
      { name: 'type', type: 'string', description: '按钮类型，例如 primary、danger', required: 1 },
      { name: 'size', type: 'string', description: '按钮尺寸，如 small、medium、large', required: 0 },
      { name: 'disabled', type: 'boolean', description: '是否禁用按钮', required: 0 }
    ]
  },
  {
    id: 'btn-secondary',
    name: 'SecondaryButton',
    description: '用于次要操作的按钮，常用于取消或返回',
    preview_url: '/images/btn-secondary.png',
    structure_json: JSON.stringify({
      type: 'Button',
      children: ['Cancel'],
      props: { type: 'secondary', size: 'medium' },
    }),
    props: [
      { name: 'type', type: 'string', description: '按钮类型，例如 secondary、ghost', required: 1 },
      { name: 'size', type: 'string', description: '按钮尺寸', required: 0 },
      { name: 'disabled', type: 'boolean', description: '是否禁用按钮', required: 0 }
    ]
  },
  {
    id: 'btn-icon',
    name: 'IconButton',
    description: '仅包含图标的按钮，常用于设置、编辑等场景',
    preview_url: '/images/btn-icon.png',
    structure_json: JSON.stringify({
      type: 'IconButton',
      children: [],
      props: { icon: 'settings', ariaLabel: '设置' },
    }),
    props: [
      { name: 'icon', type: 'string', description: '按钮图标名', required: 1 },
      { name: 'ariaLabel', type: 'string', description: '无障碍辅助标签', required: 1 },
      { name: 'disabled', type: 'boolean', description: '是否禁用按钮', required: 0 }
    ]
  },
  {
    id: 'btn-loading',
    name: 'LoadingButton',
    description: '带有加载动画的按钮，适用于提交中状态',
    preview_url: '/images/btn-loading.png',
    structure_json: JSON.stringify({
      type: 'Button',
      children: ['提交中...'],
      props: { loading: true },
    }),
    props: [
      { name: 'loading', type: 'boolean', description: '是否展示加载状态', required: 0 },
      { name: 'disabled', type: 'boolean', description: '是否禁用按钮', required: 0 }
    ]
  },
  {
    id: 'input-text',
    name: 'TextInput',
    description: '单行文本输入框，适用于用户输入文本信息',
    preview_url: '/images/input-text.png',
    structure_json: JSON.stringify({
      type: 'Input',
      children: [],
      props: { placeholder: '请输入内容', value: '' },
    }),
    props: [
      { name: 'placeholder', type: 'string', description: '输入框占位符文字', required: 0 },
      { name: 'value', type: 'string', description: '当前输入值', required: 0 },
      { name: 'disabled', type: 'boolean', description: '是否禁用输入', required: 0 }
    ]
  },
  {
    id: 'input-password',
    name: 'PasswordInput',
    description: '密码输入框，用于输入受保护的文本',
    preview_url: '/images/input-password.png',
    structure_json: JSON.stringify({
      type: 'Input',
      children: [],
      props: { type: 'password', placeholder: '请输入密码' },
    }),
    props: [
      { name: 'type', type: 'string', description: '输入框类型，固定为 password', required: 1 },
      { name: 'placeholder', type: 'string', description: '输入提示文字', required: 0 }
    ]
  },
  {
    id: 'card-basic',
    name: 'BasicCard',
    description: '基本卡片容器，可用于信息展示',
    preview_url: '/images/card-basic.png',
    structure_json: JSON.stringify({
      type: 'Card',
      children: ['卡片内容'],
      props: { elevation: 1 },
    }),
    props: [
      { name: 'elevation', type: 'number', description: '卡片阴影层级', required: 0 }
    ]
  },
  {
    id: 'card-clickable',
    name: 'ClickableCard',
    description: '可点击的卡片组件，支持 hover 效果',
    preview_url: '/images/card-clickable.png',
    structure_json: JSON.stringify({
      type: 'Card',
      children: ['点击查看详情'],
      props: { onClick: 'handleClick', hoverable: true },
    }),
    props: [
      { name: 'onClick', type: 'function', description: '点击时的处理函数', required: 0 },
      { name: 'hoverable', type: 'boolean', description: '是否启用悬浮效果', required: 0 }
    ]
  },
  {
    id: 'switch-basic',
    name: 'Switch',
    description: '开关组件，用于在开/关状态之间切换',
    preview_url: '/images/switch.png',
    structure_json: JSON.stringify({
      type: 'Switch',
      children: [],
      props: { checked: false, disabled: false },
    }),
    props: [
      { name: 'checked', type: 'boolean', description: '是否处于选中状态', required: 0 },
      { name: 'disabled', type: 'boolean', description: '是否禁用开关', required: 0 }
    ]
  },
  {
    id: 'btn-danger',
    name: 'DangerButton',
    description: '用于删除、移除等危险操作的红色按钮',
    preview_url: '/images/btn-danger.png',
    structure_json: JSON.stringify({
      type: 'Button',
      children: ['删除'],
      props: { type: 'danger', size: 'medium' },
    }),
    props: [
      { name: 'type', type: 'string', description: '按钮类型，例如 danger', required: 1 },
      { name: 'size', type: 'string', description: '按钮尺寸', required: 0 },
      { name: 'disabled', type: 'boolean', description: '是否禁用按钮', required: 0 }
    ]
  }
];

