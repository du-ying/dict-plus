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

  static getValueByIndex (dictName, index, fields = []) {
    const values = this.getValues(dictName, { fields })
    index = Math.abs(_.toSafeInteger(index))
    return values[index % values.length]
  }

  static getValueByKey (dictName, mapKey, fields = []) {}
}