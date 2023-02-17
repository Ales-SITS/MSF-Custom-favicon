
export default class Favicon {

  
    private _url: string;

    private _siteLogo: string;
    
    private _sameAsSite: boolean;

    private _urlEx: boolean

    private static _instance: Favicon;

    public static getInstance(): Favicon {
        if (!this._instance) {
            this._instance = new Favicon();
        }
        return this._instance;
    }


    public update() {
        let img: string = null;  
        
          this.validURL().then((valid:boolean) => {
   
        if (true == this._sameAsSite && !this.hasUrl() && false == valid) {
            img = this._siteLogo;
        } else if (true == this._sameAsSite && this.hasUrl() && false == valid){
            img = this._siteLogo;
        } else if (true == this._sameAsSite && this.hasUrl() && true == valid) {
            img = this._url;
        }
        }).then(()=>{
       
            this.updateDOM(img);})

        //this.updateDOM(img);
    }

  
    public get url(): string {
        return this._url;
    }

    public set url(value: string) {
        this._url = value;
    }

    public get siteLogo(): string {
        return this._siteLogo;
    }

    public set siteLogo(value: string) {
        this._siteLogo = value;
    }

    public get sameAsSite(): boolean {
        return this._sameAsSite;
    }

    public set sameAsSite(value: boolean) {
        this._sameAsSite = (undefined == value) ? true : value;
    }
   
    private updateDOM(s: string) {
        if (null != s && s.trim().length > 3) {
            let faviconElement: HTMLElement = document.getElementById('favicon');
            if (faviconElement) {
                faviconElement.setAttribute('href', s);
            }
        }
    }

      private hasUrl(): boolean {
        return (undefined == this._url || null == this._url || this._url.trim().length < 3) ? false : true;
    }


    private validURL(): any {
        const img = new Image();
        img.src = this._url
        return new Promise((resolve) => {
            img.onload = () => resolve(true);
            img.onerror = () => resolve(false);
          })
    }

    private hasSiteLogo(): boolean {
        const r: RegExp = new RegExp(/_layouts\/15\/images/g);
        return (undefined == this._siteLogo || null == this._siteLogo || this._siteLogo.trim().length < 3 || r.test(this._siteLogo)) ? false : true;
    }
}
