export const jsxTypes = {
  "w-button": `
    "w-button": React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
      variant?: string;
      width?: string;
    };
  `,
  "w-card": `
    "w-card": React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
      cardTitle?: string;
      cardContent?: string;
      cardImageSource?: string;
      cardTitleColor?: string;
      cardContentColor?: string;
    };
  `,
  "w-input": `
    "w-input": React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
      inputLabel?: string;
      inputPlaceholder?: string;
      inputWidth?: string;
    };
  `,
  "w-textarea": `
    "w-textarea": React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
    inputLabel?: string;
    inputPlaceholder?: string;
    inputWidth?: string;
    rows?: string;
    };
  `,
  "w-te": `
    "w-textarea": React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
    inputLabel?: string;
    inputPlaceholder?: string;
    inputWidth?: string;
    rows?: string;
    };
  `,
};

// NOTE: This file should not be edited
