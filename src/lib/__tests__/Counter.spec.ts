/**
 * @jest-environment jsdom
 */

import { render, fireEvent } from '@testing-library/svelte';
import Counter from '../Counter.svelte';

describe('Counter Component', () => {
  test('it changes count when button is clicked', async () => {
    const { getByText } = render(Counter);
    const button = getByText(/Clicks:/);
    expect(button.innerHTML).toBe('Clicks: 0');
    await fireEvent.click(button);
    expect(button.innerHTML).toBe('Clicks: 1');
  });
});
