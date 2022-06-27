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

DictPlus.getValues('OrderStatus') // => []

/**
 * => [
     { label: '1', value: 1, alias: 'label-1' },
     { label: '2', value: 2, alias: 'label-2' },
     { label: '3', value: 3, alias: 'label-3' }
 ]
 * */
DictPlus.getValues('OrderStatusEnum')

DictPlus.getValues('OrderStatusEnum', { mapKeys: 'code2' }) // => [{ label: '2', value: 2, alias: 'label-2' }]

DictPlus.getValues('OrderStatusEnum', { mapKeys: 'code4' }) // => [{}]

DictPlus.getValues('OrderStatusEnum', { mapKeys: 'code4, code2' }) // => [{}, { label: '2', value: 2, alias: 'label-2' }]

DictPlus.getValues('OrderStatusEnum', { fields: 'value' }) // => [{ value: 1 }, { value: 2 }, { value: 3 }]
DictPlus.getValues('OrderStatusEnum', { fields: 'other, value' }) // 同上

DictPlus.getValues('OrderStatusEnum', { fields: 'other' }) // => [{}, {}, {}]

DictPlus.getValues('OrderStatusEnum', { mapKeys: 'code2', fields: 'value' }) // => [{ value: 2 }]

/**
 * => [
 { value: 2, alias: 'label-2' },
 { value: 3, alias: 'label-3' }
 ]
 * */
DictPlus.getValues('OrderStatusEnum', { mapKeys: 'code2, code3', fields: 'value, alias' })
DictPlus.getValues('OrderStatusEnum', { mapKeys: 'code2, code3', fields: 'value, alias, other' }) // 同上
```

## DictPlus 类静态方法
| 方法名 | 说明 |
| --- | --- |
| register(dictName, mapObj)
| getValues(dictName, { mapKeys = [], fields = [] } = {}): Array
| getValueByIndex (dictName, index, { fields = [], targetField } = {})
| getValueByKey (dictName, mapKey, { fields = [], targetField } = {})
| getValueBySearch (dictName, searchField, searchValue, targetField)
