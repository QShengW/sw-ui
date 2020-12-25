import { BaseOptionProps } from '../Types'

/**
 * 选择 格式化选中目标的函数
 * @param areaArr 
 */
export interface IFormat {
  FormatValueName: string, FormatLabelName: string, FormatChildrenName: string, FormatChildrenTwoName: string
}
export const format = (
  formatArr: any[],
  {
    FormatValueName,
    FormatLabelName,
    FormatChildrenName,
    FormatChildrenTwoName
  }: IFormat) => {
  var newArr: BaseOptionProps[] = [];
  if (formatArr && formatArr.length > 0) {
    formatArr.map((item, i) => { // 一维 循环
      let { ...params } = item // 不改变原对象children的值
      delete params[FormatChildrenName]
      delete params[FormatChildrenTwoName]
      newArr.push({
        value: item[FormatValueName],
        label: item[FormatLabelName],
        data: params,
        children: []
      });
      if (item[FormatChildrenName] && item[FormatChildrenName].length > 0) {
        var childrenArr: any = [];
        item[FormatChildrenName].map((children: any, j: any) => { // 二维 循环
          let { ...params } = children // 不改变原对象children的值
          delete params[FormatChildrenName]
          delete params[FormatChildrenTwoName]
          childrenArr.push({
            value: children[FormatValueName],
            label: children[FormatLabelName],
            data: params
          });
          let childrenArrs = [];
          if (children[FormatChildrenTwoName] && children[FormatChildrenTwoName].length > 0) {
            children[FormatChildrenTwoName].map((childrens: any, s: any) => { // 三维 循环
              let { ...params } = childrens // 不改变原对象childrens的值
              delete params[FormatChildrenName]
              delete params[FormatChildrenTwoName]
              childrenArrs.push({
                value: childrens[FormatValueName],
                label: childrens[FormatLabelName],
                data: params
              });
              return childrens
            });
          } else {
            childrenArrs.push({
              value: "",
              label: "",
              data: ""
            });
          }
          newArr[i] = Object.assign(newArr[i], {
            children: childrenArr
          });
          newArr[i].children[j] = Object.assign(
            newArr[i].children[j],
            {
              children: childrenArrs
            }
          );
          return children

        });
      }
      return item
    });
  }
  return newArr
}











interface IFlattenArr {
  value: string,
  label: string,
  [key: string]: any
}
export const flattenArr = (arr: IFlattenArr[]) => {
  return arr.reduce((map: { [key: string]: any }, item) => {
    map[item.id] = item
    return map
  }, {})
}

export const objToArr = (obj: { [key: string]: any }) => {
  return Object.keys(obj).map(key => obj[key])
}