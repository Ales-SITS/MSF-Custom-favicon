import {
  BaseApplicationCustomizer
} from '@microsoft/sp-application-base';
import Favicon from './components/Favicon';

export interface IMsfCustomFaviconApplicationCustomizerProperties {
  faviconURL: string;
  faviconSameAsSite: boolean;
}

export default class MsfCustomFaviconApplicationCustomizer
  extends BaseApplicationCustomizer<IMsfCustomFaviconApplicationCustomizerProperties> {

  private _fav: Favicon;

  private _siteId: string;

  public onInit(): Promise<void> {
    
    const favUrl =`${this.context.pageContext.site.absoluteUrl}/SiteAssets/favicon.ico`
    this._fav = Favicon.getInstance();
    this._fav.url = favUrl; 
    this._fav.sameAsSite = true
    this.context.placeholderProvider.changedEvent.add(this, this.updateFavicon);
    this.context.application.navigatedEvent.add(this, this.updateFavicon);

    return Promise.resolve();
  }

  private updateFavicon() {
    /* If the web as changed */
    if (undefined == this._siteId || this._siteId != this.context.pageContext.site.id.toString()) {
      this._fav.siteLogo = this.context.pageContext.web.logoUrl;
      this._fav.update();
    }
  }
}
