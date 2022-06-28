import DictPlus from '../src/DictPlus'

DictPlus.register('OrderStatusEnum', new Map([
  ['code1', { label: '1', value: 1, alias: 'label-1' }],
  ['code2', { label: '2', value: 2, alias: 'label-2' }],
  ['code3', { label: '3', value: 3, alias: 'label-3' }]
]))

DictPlus.register('abc.OrderStatusEnum', new Map([
  ['code1', { label: 'abc1', value: 4 }],
  ['code2', { label: 'abc2', value: 5 }],
  ['code3', { label: 'abc3', value: 6 }]
]))

test('DictPlus.getValues 方法测试', function () {
  expect(DictPlus.getValues('OrderStatus')).toEqual([])

  expect(DictPlus.getValues('a.OrderStatusEnum')).toEqual([])

  expect(DictPlus.getValues('OrderStatusEnum')).toEqual([
    { label: '1', value: 1, alias: 'label-1' },
    { label: '2', value: 2, alias: 'label-2' },
    { label: '3', value: 3, alias: 'label-3' }
  ])

  expect(DictPlus.getValues('OrderStatusEnum'))
    .toEqual(DictPlus.getValues('OrderStatusEnum', { mapKeys: 'code1, code2, code3' }))

  expect(DictPlus.getValues('OrderStatusEnum'))
    .toEqual(DictPlus.getValues('OrderStatusEnum', { fields: 'label, value, alias' }))

  expect(DictPlus.getValues('abc.OrderStatusEnum')).toEqual([
    { label: 'abc1', value: 4 },
    { label: 'abc2', value: 5 },
    { label: 'abc3', value: 6 }
  ])

  expect(DictPlus.getValues('OrderStatusEnum', { mapKeys: 'code2' }))
    .toEqual([{ label: '2', value: 2, alias: 'label-2' }])

  expect(DictPlus.getValues('OrderStatusEnum', { mapKeys: 'code4' }))
    .toEqual([{}])

  expect(DictPlus.getValues('OrderStatusEnum', { mapKeys: 'code4, code2' }))
    .toEqual([
      {},
      { label: '2', value: 2, alias: 'label-2' }
    ])

  expect(DictPlus.getValues('OrderStatusEnum', { mapKeys: 'code1,code2' }))
    .toEqual([
      { label: '1', value: 1, alias: 'label-1' },
      { label: '2', value: 2, alias: 'label-2' }
    ])

  expect(DictPlus.getValues('OrderStatusEnum', { mapKeys: ['code1', 'code2'] }))
    .toEqual(DictPlus.getValues('OrderStatusEnum', { mapKeys: 'code1, code2' }))

  expect(DictPlus.getValues('OrderStatusEnum', { fields: 'value' }))
    .toEqual([{ value: 1 }, { value: 2 }, { value: 3 }])

  expect(DictPlus.getValues('OrderStatusEnum', { fields: 'other' }))
    .toEqual([{}, {}, {}])

  expect(DictPlus.getValues('OrderStatusEnum', { fields: 'label, alias' }))
    .toEqual([
      { label: '1', alias: 'label-1' },
      { label: '2', alias: 'label-2' },
      { label: '3', alias: 'label-3' }
    ])

  expect(DictPlus.getValues('OrderStatusEnum', { fields: 'other, value' }))
    .toEqual([{ value: 1 }, { value: 2 }, { value: 3 }])

  expect(DictPlus.getValues('OrderStatusEnum', { fields: 'label, alias' }))
    .toEqual(DictPlus.getValues('OrderStatusEnum', { fields: ['label', 'alias'] }))

  expect(DictPlus.getValues('OrderStatusEnum', { mapKeys: 'code2', fields: 'value' }))
    .toEqual([{ value: 2 }])

  expect(DictPlus.getValues('OrderStatusEnum', { mapKeys: 'code2, code3', fields: 'label, value' }))
    .toEqual([
      { value: 2, label: '2' },
      { value: 3, label: '3' }
    ])

  expect(DictPlus.getValues('OrderStatusEnum', { mapKeys: 'code2, code3', fields: 'value, alias' }))
    .toEqual(DictPlus.getValues('OrderStatusEnum', { mapKeys: 'code2, code3', fields: 'value, alias, other' }))
})

test('DictPlus.getValueByIndex 方法测试', function () {
  expect(DictPlus.getValueByIndex('OrderStatus', 0))
    .toBeUndefined()

  expect(DictPlus.getValueByIndex('OrderStatus', 0, { targetField: 'a' }))
    .toBeUndefined()

  expect(DictPlus.getValueByIndex('OrderStatusEnum', 0))
    .toEqual({ label: '1', value: 1, alias: 'label-1' })

  expect(DictPlus.getValueByIndex('OrderStatusEnum', 3))
    .toEqual(DictPlus.getValueByIndex('OrderStatusEnum', 0))

  expect(DictPlus.getValueByIndex('OrderStatusEnum', 1, { targetField: 'value' }))
    .toBe(2)

  expect(DictPlus.getValueByIndex('OrderStatusEnum', -2))
    .toEqual({ label: '3', value: 3, alias: 'label-3' })
})

test('DictPlus.getValueByKey 方法测试', function () {
  expect(DictPlus.getValueByKey('OrderStatus', 'code2'))
    .toBeUndefined()

  expect(DictPlus.getValueByKey('OrderStatusEnum', 'code4'))
    .toEqual({})

  expect(DictPlus.getValueByKey('OrderStatusEnum', 'code1, code2'))
    .toEqual({})

  expect(DictPlus.getValueByKey('OrderStatusEnum', 'code2'))
    .toEqual({ label: '2', value: 2, alias: 'label-2' })

  expect(DictPlus.getValueByKey('OrderStatusEnum', 'code2', { targetField: 'alias' }))
    .toBe('label-2')
})

test('getValueBySearch 方法测试', function () {
  expect(DictPlus.getValueBySearch('OrderStatus', 'value', 2, 'alias'))
    .toBeUndefined()

  expect(DictPlus.getValueBySearch('OrderStatusEnum', 'value', 2, 'alias'))
    .toBe('label-2')

  expect(DictPlus.getValueBySearch('OrderStatusEnum', 'value', 2, 'other'))
    .toBeUndefined()

  expect(DictPlus.getValueBySearch('OrderStatusEnum', 'value', 4, 'alias'))
    .toBeUndefined()

  expect(DictPlus.getValueBySearch('OrderStatusEnum', 'other', 'otherValue', 'alias'))
    .toBeUndefined()
})
