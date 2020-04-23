import React, {useState, useMemo} from 'react';
import classnames from 'classnames';
import ShopAdjoin from './demo';
import './index.css'

const data = [
  { id: '1', specs: [ '紫色', '套餐一', '64G' ] },
  { id: '2', specs: [ '紫色', '套餐一', '128G' ] },
  { id: '3', specs: [ '紫色', '套餐二', '128G' ] },
  { id: '4', specs: [ '黑色', '套餐三', '256G' ] },
];
const commoditySpecs = [
  { title: '颜色', list: [ '紫色', '黑色' ] },
  { title: '套餐', list: [ '套餐一', '套餐二', '套餐三' ]},
  { title: '内存', list: [ '64G', '128G', '256G' ] }
];
export default () => {

  const [specsS, setSpecsS] = useState(Array.from({ length: commoditySpecs.length }));
  // 创建一个购物矩阵
  const shopAdjoin = useMemo(() => new ShopAdjoin(commoditySpecs, data), [commoditySpecs, data]);
  // const shopAdjoin = new ShopAdjoin(commoditySpecs, data)
  // 获得可选项表
  const optionSpecs = shopAdjoin.querySpecsOptions(specsS);
  console.log(shopAdjoin, optionSpecs);

  const handleClick = function (bool, text, index) {
    if (specsS[index] !== text && !bool) return;
    specsS[index] = specsS[index] === text ? '' : text;
    setSpecsS(specsS.slice())
  };

  return (
    <div className="container">
      {
        commoditySpecs.map(({ title, list }, index) => (
          <div key={index}>
            <p>{title}</p>
            <div className='main'>
              {
                list.map((value, i) => <div key={i}>
                  <div
                    key={i}
                    className={classnames({
                      option: optionSpecs.indexOf(value) > -1,
                      active: specsS.indexOf(value) > -1,
                      item: true
                    })}
                    onClick={() => handleClick(optionSpecs.indexOf(value) > -1, value, index)}
                  >{value}
                  </div>
                  {' '}
                </div>)
              }
            </div>
          </div>
        ))
      }
    </div>
  );
  
}