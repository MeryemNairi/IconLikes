import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { sp } from "@pnp/sp/presets/all";
import IconLike from './components/IconLike';
import { IIconLikeProps } from './components/IIconLikeProps';


export default class IconLikeWebPart extends BaseClientSideWebPart<IIconLikeProps> {
  protected async onInit(): Promise<void> {
    await super.onInit();
    sp.setup({
      spfxContext: this.context as any
    });
  }
  
  

  public render(): void {
    const element: React.ReactElement<IIconLikeProps> = React.createElement(
      IconLike,
      {
        description: this.properties.description
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }
}
