declare module '*.css' {
  const content: string;
  export default content;
}

declare module '*.md' {
  const content: string;
  export default content;
}

declare module '*.png' {
  const value: any;
  export = value;
}
