import React from 'react'
import Chart from './components/Chart';
import UserEvent from '@testing-library/user-event';
import { fireEvent, render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render (<App />);
});


test('button', () => {
  render (<Chart />);
  const submitButton = screen.getByText(/submit/i);
    expect(submitButton).toBeInTheDocument();

});

test('button event', () => {
  render (<Chart />);
  const setButton = screen.getByText(/set/);
  fireEvent.click(setButton);

});

