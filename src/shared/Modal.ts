import { Container, Graphics, Text, TextStyle } from 'pixi.js';

export class ModalWindow extends Container {
  private background: Graphics;
  private panel: Graphics;
  private buttonContainer: Container;

  constructor(screenWidth: number, screenHeight: number, title: string, buttonText: string) {
    super();

    this.background = new Graphics();
    this.background.rect(0, 0, screenWidth, screenHeight);
    this.background.fill({ color: 0x000000, alpha: 0.7 });

    this.background.eventMode = 'static';
    this.addChild(this.background);

    const panelWidth = 400;
    const panelHeight = 250;

    this.panel = new Graphics();
    this.panel.roundRect(0, 0, panelWidth, panelHeight, 15);
    this.panel.fill({ color: 0x2c3e50 });
    this.panel.stroke({ color: 0xffffff, width: 3 });

    this.panel.x = screenWidth / 2 - panelWidth / 2;
    this.panel.y = screenHeight / 2 - panelHeight / 2;
    this.addChild(this.panel);

    const titleStyle = new TextStyle({
      fill: '#ffffff',
      fontSize: 36,
      fontWeight: 'bold',
      dropShadow: { color: '#000000', blur: 4, distance: 2 },
    });

    const titleText = new Text({ text: title, style: titleStyle });
    titleText.anchor.set(0.5);
    titleText.x = screenWidth / 2;
    titleText.y = this.panel.y + 60;
    this.addChild(titleText);

    this.buttonContainer = new Container();

    const btnBg = new Graphics();
    const btnWidth = 200;
    const btnHeight = 50;
    btnBg.roundRect(0, 0, btnWidth, btnHeight, 10);
    btnBg.fill({ color: 0x27ae60 });

    const btnTextStyle = new TextStyle({ fill: '#ffffff', fontSize: 24, fontWeight: 'bold' });
    const btnLabel = new Text({ text: buttonText, style: btnTextStyle });
    btnLabel.anchor.set(0.5);
    btnLabel.x = btnWidth / 2;
    btnLabel.y = btnHeight / 2;

    this.buttonContainer.addChild(btnBg, btnLabel);

    this.buttonContainer.x = screenWidth / 2 - btnWidth / 2;
    this.buttonContainer.y = this.panel.y + panelHeight - 80;

    this.buttonContainer.eventMode = 'static';
    this.buttonContainer.cursor = 'pointer';

    this.buttonContainer.on('pointerover', () => {
      btnBg.clear();
      btnBg.roundRect(0, 0, btnWidth, btnHeight, 10);
      btnBg.fill({ color: 0x2ecc71 });
    });

    this.buttonContainer.on('pointerout', () => {
      btnBg.clear();
      btnBg.roundRect(0, 0, btnWidth, btnHeight, 10);
      btnBg.fill({ color: 0x27ae60 });
    });

    this.addChild(this.buttonContainer);

    this.visible = false;
  }

  public show() {
    this.visible = true;
  }

  public hide() {
    this.visible = false;
  }

  public onClick(callback: () => void) {
    this.buttonContainer.on('pointerup', callback);
  }
}
