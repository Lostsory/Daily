
class Adjoin {
  constructor (vertex) {
    this.vertex = vertex
    this.quantity = vertex.length
    this.adjoinArray = Array.from({length: this.quantity * this.quantity})
  }
  getVertexRow(id) {
    const index = this.vertex.indexOf(id)
    const col= []
    this.vertex.forEach((item, i) => {
      col.push(this.adjoinArray[index + this.quantity * i])
    })
    return col
  }
  getAdjoinVertexs(id) {
    return this.getVertexRow(id).map((item, index) => item ? this.vertex[index] : '').filter(Boolean)
  }
  setAdjoinVertexs(id, sides){
    const pIndex = this.vertex.indexOf(id)
    sides.forEach((item) => {
      const index = this.vertex.indexOf(item)
      this.adjoinArray[this.quantity * pIndex + index] = 1
    })
  }
  getRowToatl(params) {
    params = params.map(id => this.getVertexRow(id)) // [ [undefined, undefined, 1, 1, undefined], [undefined, undefined, undefined, 1, 1] ]
    const adjoinNames = [];
    this.vertex.forEach((item, index) => {
      const rowtotal = params.map(v => v[index]).reduce((sum, cur) => {
        sum += cur || 0
        return sum
      }, 0)
      adjoinNames.push(rowtotal)
    })
    return adjoinNames;
  }
  // 交集
  getUnions(params) {
    const row = this.getRowToatl(params);
    return row.map((item, index) => item >= params.length && this.vertex[index]).filter(Boolean);
  }

  // 并集
  getCollection(params) {
    params = this.getRowToatl(params);
    return params.map((item, index) => item && this.vertex[index]).filter(Boolean);
  }
}
// const demo = new Adjoin(['v0', 'v1', 'v2', 'v3', 'v4'])

// // 注册邻接点
// demo.setAdjoinVertexs('v0', ['v2', 'v3']);
// demo.setAdjoinVertexs('v1', ['v3', 'v4']);
// demo.setAdjoinVertexs('v2', ['v0', 'v3', 'v4']);
// demo.setAdjoinVertexs('v3', ['v0', 'v1', 'v2']);
// demo.setAdjoinVertexs('v4', ['v1', 'v2']);

class ShopAdjoin extends Adjoin {
  constructor(commoditySpecs, data) {
    super(commoditySpecs.reduce((total, current) => [
      ...total,
      ...current.list,
    ], []));
    this.commoditySpecs = commoditySpecs;
    this.data = data;
    // 单规格矩阵创建
    this.initCommodity();
    // 同类顶点创建
    this.initSimilar();
    console.log('12321312321312');
  }

  initCommodity() {
    this.data.forEach((item) => {
      this.applyCommodity(item.specs);
    });
  }

  initSimilar() {
    // 获得所有可选项
    const specsOption = this.getCollection(this.vertex);
    this.commoditySpecs.forEach((item) => {
      const params = [];
      item.list.forEach((value) => {
        if (specsOption.indexOf(value) > -1) params.push(value);
      });
      // 同级点位创建
      this.applyCommodity(params);
    });
  }

  querySpecsOptions(params) {
    // 判断是否存在选项填一个
    if (params.some(Boolean)) {
      // 过滤一下选项
      params = this.getUnions(params.filter(Boolean));
    } else {
      // 兜底选一个
      params = this.getCollection(this.vertex);
    }
    return params;
  }

  applyCommodity(params) {
    params.forEach((param) => {
      this.setAdjoinVertexs(param, params);
    });
  }
}
export default ShopAdjoin