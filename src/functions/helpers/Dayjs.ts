import dayjs from 'dayjs'

export function isBeforeOrSameByDate(
  dayjsSrc: dayjs.Dayjs,
  dayjsDest: dayjs.Dayjs
): boolean {
  const [srcYear, srcMonth, srcDate] = [
    dayjsSrc.year(),
    dayjsSrc.month(),
    dayjsSrc.date(),
  ]
  const [destYear, destMonth, destDate] = [
    dayjsDest.year(),
    dayjsDest.month(),
    dayjsDest.date(),
  ]
  switch (true) {
    case srcYear > destYear:
      return true
    case srcYear < destYear:
      return false
    case srcYear === destYear:
      switch (true) {
        case srcMonth > destMonth:
          return true
        case srcMonth < destMonth:
          return false
        case srcMonth === destMonth:
          switch (true) {
            case srcDate > destDate:
              return true
            case srcDate < destDate:
              return false
            case srcDate === destDate:
              return true
          }
      }
  }
  //unreachable
  throw new Error('isBeforeOrSameByDate: invalid date')
}

export function isAfterOrSameByDate(
  dayjsSrc: dayjs.Dayjs,
  dayjsDest: dayjs.Dayjs
): boolean {
  const [srcYear, srcMonth, srcDate] = [
    dayjsSrc.year(),
    dayjsSrc.month(),
    dayjsSrc.date(),
  ]
  const [destYear, destMonth, destDate] = [
    dayjsDest.year(),
    dayjsDest.month(),
    dayjsDest.date(),
  ]
  switch (true) {
    case srcYear < destYear:
      return true
    case srcYear > destYear:
      return false
    case srcYear === destYear:
      switch (true) {
        case srcMonth < destMonth:
          return true
        case srcMonth > destMonth:
          return false
        case srcMonth === destMonth:
          switch (true) {
            case srcDate < destDate:
              return true
            case srcDate > destDate:
              return false
            case srcDate === destDate:
              return true
          }
      }
  }
  //unreachable
  throw new Error('isAfterOrSameByDate: invalid date')
}
