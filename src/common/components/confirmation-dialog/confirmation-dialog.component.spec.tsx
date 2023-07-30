import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ConfirmationDialogComponent } from './confirmation-dialog.component';

describe('common/ConfirmationDialog specs', () => {
  // Comprobamos que no se muestra en pantalla el diálogo de confirmación si isOpen = false
  it('should not render a dialog element when isOpen property is set to false', () => {
    // Arrange
    const labelProps = {
      closeButton: '',
      acceptButton: '',
    };

    const props = {
      isOpen: false,
      onAccept: () => {},
      onClose: () => {},
      title: '',
      labels: labelProps,
      children: '',
    };

    // Act
    render(<ConfirmationDialogComponent {...props} />);
    const dialogElement = screen.queryByRole('dialog');

    // Assert
    expect(dialogElement).not.toBeInTheDocument();
  });

  // Comprobamos que se muestra en pantalla el diálogo de confirmación si isOpen = true
  it('should render a dialog element when isOpen property is set to true', () => {
    // Arrange
    const labelProps = {
      closeButton: '',
      acceptButton: '',
    };

    const props = {
      isOpen: true,
      onAccept: () => {},
      onClose: () => {},
      title: '',
      labels: labelProps,
      children: '',
    };

    // Act
    render(<ConfirmationDialogComponent {...props} />);
    const dialogElement = screen.getByRole('dialog');
    // screen.debug()

    // Assert
    expect(dialogElement).toBeInTheDocument();
  });

  // Comprobamos que las propiedades del diálogo se renderizan correctamente
  it('should render a dialog element with info when provided', () => {
    // Arrange
    const labelProps = {
      closeButton: 'test close button',
      acceptButton: 'test accept button',
    };

    const props = {
      isOpen: true,
      onAccept: () => {},
      onClose: () => {},
      title: 'test title',
      labels: labelProps,
      children: 'test children',
    };

    // Act
    render(<ConfirmationDialogComponent {...props} />);
    const dialogElement = screen.getByRole('dialog');
    const h2Element = screen.getByText('test title');
    const childrenElement = screen.getByText('test children');
    // screen.debug()
    const closeButtonElement = screen.getByText('test close button');

    // Assert
    expect(dialogElement).toBeInTheDocument();
    expect(h2Element.textContent).toEqual('test title');
    expect(childrenElement.textContent).toEqual('test children');
    expect(closeButtonElement.textContent).toEqual('test close button');
  });

  // Comprobamos que se llama a la función onAccept al pulsar el botón acceptButton
  it('should call onAccept when it clicks on acceptButton', async () => {
    // Arrange
    const labelProps = {
      closeButton: 'test close button',
      acceptButton: 'test accept button',
    };

    const props = {
      isOpen: true,
      onAccept: jest.fn(), // Se usa spy porque el método se pasa como parámetro
      onClose: () => {},
      title: 'test title',
      labels: labelProps,
      children: 'test children',
    };

    // Act
    render(<ConfirmationDialogComponent {...props} />);
    const acceptButton = screen.getByRole('button', {
      name: 'test accept button',
    });

    // Lanzamos el evento click
    await userEvent.click(acceptButton);

    // Assert
    expect(props.onAccept).toHaveBeenCalled();
  });
});
