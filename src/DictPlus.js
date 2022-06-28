import _ from 'lodash'

export default class DictPlus {
  static #source = new Map()

  static register (dictName, mapObj) {
    if (!_.isMap(mapObj)) {
      throw new Error('DictPlus.register(dictName, mapObj) 参数 mapObj 必须为 Map 对象')
    }
    this.#source.set(dictName, mapObj)
  }

  static getValues (dictName, { mapKeys = [], fields = [] } = {}) {
    if (this.#source.has(dictName) && _.isMap(this.#source.get(dictName))) {
      const collection = [...this.#source.get(dictName)]
      if (_.isString(mapKeys)) {
        mapKeys = _.split(mapKeys, /\s?,\s?/)
      }
      if (_.isString(fields)) {
        fields = _.split(fields, /\s?,\s?/)
      }
      const keys = [...this.#source.get(dictName).keys()]
      const values = mapKeys.length === 0
        ? _.clone(collection)
        : _.map(mapKeys, key => [key, _.includes(keys, key) ? this.#source.get(dictName).get(key) : {}])
      return values.map(([key, value]) => fields.length === 0 ? value : _.pick(value, fields))
    } else {
      return []
    }
  }

  static getValueByIndex (dictName, index, { targetField } = {}) {
    const values = this.getValues(dictName)
    index = Math.abs(_.toSafeInteger(index))
    const result = values[index % values.length]
    if (_.isUndefined(result)) return undefined
    return _.isString(targetField) && targetField !== '' && _.isObjectLike(result) ? result[targetField] : result
  }

  static getValueByKey (dictName, mapKey, { targetField } = {}) {
    const values = this.getValues(dictName, { mapKeys: _.replace(mapKey, /\s?,\s?/, '') })
    const result = values.length > 0 ? values[0] : {}
    return _.isString(targetField) && _.isObjectLike(result) ? result[targetField] : result
  }

  static getValueBySearch (dictName, searchField, searchValue, targetField) {
    const values = this.getValues(dictName)
    const data = _.find(values, [searchField, searchValue])
    if (_.isUndefined(data)) return undefined
    return _.isString(targetField) && _.isObjectLike(data) ? data[targetField] : data
  }
}
