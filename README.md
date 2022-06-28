# dict-plus
字典工具

## 安装
```
npm install @duying/dict-plus
```

## 示例
```javascript
import DictPlus from '@duying/dict-plus'

DictPlus.register('OrderStatusEnum', new Map([
  ['code1', { label: '1', value: 1, alias: 'label-1' }],
  ['code2', { label: '2', value: 2, alias: 'label-2' }],
  ['code3', { label: '3', value: 3, alias: 'label-3' }]
]))

DictPlus.getValues('OrderStatus') // => 字典不存在，返回 []
/**
=> [
  { label: '1', value: 1, alias: 'label-1' },
  { label: '2', value: 2, alias: 'label-2' },
  { label: '3', value: 3, alias: 'label-3' }
 ]
 * */
DictPlus.getValues('OrderStatusEnum')
DictPlus.getValues('OrderStatusEnum', { mapKeys: 'code1, code2, code3' }) // 同上
DictPlus.getValues('OrderStatusEnum', { fields: 'label, value, alias' }) // 同上
/**
=> [
  { label: '2', value: 2 },
  { label: '3', value: 3 },
 ]
 * */
DictPlus.getValues('OrderStatusEnum', { mapKeys: 'code2, code3', fields: 'label, value' })

DictPlus.getValueByIndex('OrderStatus', 0) // => 字典不存在，返回 undefined
DictPlus.getValueByIndex('OrderStatusEnum', 0) // => { label: '1', value: 1, alias: 'label-1' }
DictPlus.getValueByIndex('OrderStatusEnum', 3) // => 同上
DictPlus.getValueByIndex('OrderStatusEnum', 1, { targetField: 'value' }) // => 2
DictPlus.getValueByIndex('OrderStatusEnum', -2) // => { label: '3', value: 3, alias: 'label-3' }

DictPlus.getValueByKey('OrderStatus', 'code2') // => 字典不存在，返回 undefined
DictPlus.getValueByKey('OrderStatusEnum', 'code4') // => {}
DictPlus.getValueByKey('OrderStatusEnum', 'code2') // => { label: '2', value: 2, alias: 'label-2' }
DictPlus.getValueByKey('OrderStatusEnum', 'code2', { targetField: 'alias' }) // => 'label-2'

DictPlus.getValueBySearch('OrderStatus', 'value', 2, 'alias') // => 字典不存在，返回 undefined
DictPlus.getValueBySearch('OrderStatusEnum', 'value', 2, 'alias') // => 'label-2'
```

## DictPlus 类静态方法
| 方法名                                                                                                                                | 说明                                                            |
|------------------------------------------------------------------------------------------------------------------------------------|---------------------------------------------------------------|
| register(dictName: String, mapObj: Map): void                                                                                      | 注册字典数据                                                        |
| getValues(dictName: String, { mapKeys?: Array\<String\>&#124;String = [], fields?: Array\<String\>&#124;String = [] } = {}): Array | 获取字典数据                                                        |
| getValueByIndex (dictName: String, index: Number, { targetField?: String } = {}): any                                              | 通过索引值 `index` 获取字典数据                                          |
| getValueByKey (dictName: String, mapKey: String, { targetField?: String } = {}): any                                               | 通过键值 `mapKey` 获取字典数据                                          |
| getValueBySearch (dictName: String, searchField: String, searchValue: any, targetField: String): any                               | 以 `searchField` + `searchValue` 做查询条件，获取 `targetField` 对应的字典值 |
