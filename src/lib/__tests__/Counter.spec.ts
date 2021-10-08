/**
 * @jest-environment jsdom
 */

import { render, fireEvent} from '@testing-library/svelte';
import Counter from '../Counter.svelte';

describe('Counter Component', () => {
  it('it changes count when button is clicked', async () => {
    const { getByText } = render(Counter);
    const button = getByText(/Clicks:/);
    expect(button.innerHTML).toBe('Clicks: 0');
    await fireEvent.click(button);
    expect(button.innerHTML).toBe('Clicks: 1');
  });

  it('it emits an event', async () => {
    const { getByText, component } = render(Counter);
    const button = getByText(/Clicks:/);
    let mockEvent = jest.fn();
    component.$on('countChanged', function (event) {
      mockEvent(event.detail);
    });
    await fireEvent.click(button);
    expect(mockEvent).toHaveBeenCalled();
    expect(mockEvent).toHaveBeenCalledTimes(1);
    expect(mockEvent).toHaveBeenLastCalledWith(1);
    await fireEvent.click(button);
    expect(mockEvent).toHaveBeenCalledTimes(2);
    expect(mockEvent).toHaveBeenLastCalledWith(2);
  });

  describe('increment', () => {
    it('it exports a method', async () => {
      const { component } = render(Counter);
      expect(component.increment).toBeDefined();
    });

    it('it exports a method', async () => {
      const { getByText, component } = render(Counter);
      const button = getByText(/Clicks:/);
      expect(button.innerHTML).toBe('Clicks: 0');
      await component.increment();
      expect(button.innerHTML).toBe('Clicks: 1');
    });
  });

  describe('count', () => {
    it('defaults to 0', async () => {
      const { getByText } = render(Counter);
      const button = getByText(/Clicks:/);
      expect(button.innerHTML).toBe('Clicks: 0');
    });

    it('can have an initial value', async () => {
      const { getByText } = render(Counter, {props: {count: 33}});
      const button = getByText(/Clicks:/);
      expect(button.innerHTML).toBe('Clicks: 33');
    });

    it('can be updated', async () => {
      const { getByText, component } = render(Counter);
      const button = getByText(/Clicks:/);
      expect(button.innerHTML).toBe('Clicks: 0');
      await component.$set({count: 41})
      expect(button.innerHTML).toBe('Clicks: 41');
    });
  });
});
