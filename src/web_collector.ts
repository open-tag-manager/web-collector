import { v4 as uuidV4 } from 'uuid'
import Cookies from 'js-cookie'
import { Payload, PageViewPayload, EventPayload, TimingPayload } from './payload'

export class WebCollector {
  endpoint: string = 'https://www.google-analytics.com/collect'
  trackingId: string
  clientId?: string

  useBeacon: boolean = false
  useQueryString: boolean = true

  static readonly CLIENT_ID_COOKIE_NAME: string = '_wc_c'
  static readonly COOKIE_LIFE_TIME: number = 60 * 60 * 24 * 365 * 2

  constructor (trackingId: string) {
    this.trackingId = trackingId
    this.loadClientId()
  }

  private loadClientId (): void {
    const cid: string | undefined = Cookies.get(WebCollector.CLIENT_ID_COOKIE_NAME)
    if (cid) {
      this.clientId = cid
    } else {
      const newClientId: string = uuidV4()
      Cookies.set(WebCollector.CLIENT_ID_COOKIE_NAME, newClientId, { expires: WebCollector.COOKIE_LIFE_TIME })
      this.clientId = newClientId
    }
  }

  private pvContextParams (): object {
    return {
      dl: document.URL,
      pt: document.title,
      de: document.charset,
      sd: `${screen.colorDepth}-bit`,
      ul: navigator.language,
      sr: `${screen.width}x${screen.height}`,
      vp: `${window.innerWidth}x${window.innerHeight}`
    }
  }

  pageview (params: {[key: string]: string} = {}): boolean {
    const p = new PageViewPayload(this.trackingId, {
      ...this.pvContextParams(),
      cid: this.clientId || '',
      ...params
    })
    return this.send(p)
  }

  event (eventCategory: string, eventAction: string, eventLabel?: string, params: {[key: string]: string} = {}): boolean {
    const sendParams: {[key: string]: string} = {
      ...this.pvContextParams(),
      cid: this.clientId || '',
      ...params
    }
    if (eventLabel) {
      sendParams.el = eventLabel
    }
    return this.send(new EventPayload(this.trackingId, eventCategory, eventAction, sendParams))
  }

  timing (userTimingCategory: string, userTimingVariableName: string, userTimingTime: number, params: {[key: string]: string} = {}): boolean {
    const p = new TimingPayload(this.trackingId, userTimingCategory, userTimingVariableName, userTimingTime, {
      cid: this.clientId || '',
      ...params
    })
    return this.send(p)
  }

  send (payload: Payload): boolean {
    if (this.useBeacon) {
      if (this.useQueryString) {
        return navigator.sendBeacon(`${this.endpoint}?${payload.toQuery()}`)
      } else {
        return navigator.sendBeacon(`${this.endpoint}`, payload.toFormData())
      }
    } else {
      if (this.useQueryString) {
        fetch(`${this.endpoint}?${payload.toQuery()}`, {
          method: 'GET',
          credentials: 'include',
          mode: 'no-cors',
          keepalive: true
        })
        return true
      } else {
        fetch(`${this.endpoint}`, {
          method: 'POST',
          body: payload.toQuery(),
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          credentials: 'include',
          mode: 'no-cors',
          keepalive: true
        })
        return true
      }
    }
  }
}
