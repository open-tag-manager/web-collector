import qs from 'qs'

export class Payload {
  // Tracking ID
  trackingId: string
  // Hit type
  hitType: string
  // another params
  params: { [key: string]: string }

  constructor (trackingId: string, hitType: string, params: { [key: string]: string } = {}) {
    this.trackingId = trackingId
    this.hitType = hitType
    this.params = params
  }

  getFormattedParams (): { [key: string]: string } {
    return { v: '1', tid: this.trackingId, t: this.hitType, ...this.params }
  }

  toQuery (): string {
    return qs.stringify(this.getFormattedParams())
  }

  toFormData (): FormData {
    const form = new FormData()
    const params = this.getFormattedParams()

    for (const k in params) {
      form.append(k, params[k])
    }

    return form
  }
}

export class PageViewPayload extends Payload {
  constructor (tid: string, params: {[key: string]: string } = {}) {
    super(tid, 'pageview', params)
  }
}

export class ScreenViewPayload extends Payload {
  constructor (tid: string, screenName: string, params: {[key: string]: string } = {}) {
    super(tid, 'screenview', { cd: screenName, ...params })
  }
}

export class TimingPayload extends Payload {
  constructor (tid: string, userTimingCategory: string, userTimingVariableName: string, userTimingTime: number, params: {[key: string]: string } = {}) {
    super(tid, 'timing', { utc: userTimingCategory, utv: userTimingVariableName, utt: userTimingTime.toString(), ...params })
  }
}

export class SocialPayload extends Payload {
  constructor (tid: string, socialNetwork: string, socialAction: string, socialActionTarget: string, params: {[key: string]: string } = {}) {
    super(tid, 'social', { sn: socialNetwork, sa: socialAction, st: socialActionTarget, ...params })
  }
}

export class EventPayload extends Payload {
  constructor (tid: string, eventCategory: string, eventAction: string, params: {[key: string]: string } = {}) {
    super(tid, 'event', { ec: eventCategory, ea: eventAction, ...params })
  }
}

export class TransactionPayload extends Payload {
  constructor (tid: string, transactionId: string, params: {[key: string]: string } = {}) {
    super(tid, 'transaction', { ti: transactionId, ...params })
  }
}

export class ItemPayload extends Payload {
  constructor (tid: string, transactionId: string, itemName: string, params: {[key: string]: string } = {}) {
    super(tid, 'item', { ti: transactionId, in: itemName, ...params })
  }
}
