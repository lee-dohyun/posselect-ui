import type { Meta, StoryObj } from '@storybook/react-vite';
import { ShellHeader } from '../components/ShellHeader';
import { ShellFooter } from '../components/ShellFooter';
import { SHELL_CSS } from '../components/shellStyles';
import { useEffect } from 'react';

const meta = {
  title: 'Components/Shell',
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    (Story) => {
      useEffect(() => {
        const style = document.createElement('style');
        style.innerHTML = SHELL_CSS;
        document.head.appendChild(style);
        return () => {
          document.head.removeChild(style);
        };
      }, []);
      return <Story />;
    },
  ],
} satisfies Meta;

export default meta;

export const Header: StoryObj<typeof ShellHeader> = {
  render: () => (
    <ShellHeader
      searchHref="https://home.posselect.com/search"
      categoriesApiBase="https://product.posselect.com"
      authApiBase="https://customer.posselect.com"
      cartApiBase="https://product.posselect.com"
    />
  ),
};

export const Footer: StoryObj<typeof ShellFooter> = {
  render: () => <ShellFooter />,
};
