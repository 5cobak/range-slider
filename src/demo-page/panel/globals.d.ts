export default interface IPanel {
  [x: string]:
    | string
    | HTMLElement
    | HTMLInputElement
    | HTMLLabelElement[]
    | (() => void)
    | ((labels: any[]) => void)
    | ((n: string) => void)
    | ((labels: any[], toggles: any[]) => void);
}
