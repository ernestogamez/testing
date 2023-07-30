import { renderHook, act, waitFor } from '@testing-library/react';
import { useConfirmationDialog } from './confirmation-dialog.hook';
import { Lookup } from 'common/models';

describe('useConfirmationDialog specs', () => {
  // Probamos que tenemos un objeto con los valores iniciales
  it('should return an object with default values and functions when it calls it', () => {
    // Arrange
    // No necesita ningún parámetro de entrada

    // Act
    const { result } = renderHook(() => useConfirmationDialog());

    // Assert
    expect(result.current.isOpen).toEqual(false);

    const defaultLookup: Lookup = { id: '', name: '' };
    expect(result.current.itemToDelete).toEqual(defaultLookup);

    expect(result.current.onAccept).toEqual(expect.any(Function)); // De esta forma se comprueba que el método onAccept es una función
    expect(result.current.onClose).toEqual(expect.any(Function));
    expect(result.current.onOpenDialog).toEqual(expect.any(Function));
  });

  // Probamos que en onAccept se setea el itemToDelete a vacío
  it('should update itemToDelete when it calls onAccept', () => {
    // Arrange
    // No necesita parámetros de entrada

    // Act
    const { result } = renderHook(() => useConfirmationDialog());

    act(() => {
      result.current.onAccept();
    });

    // Assert
    const defaultLookup: Lookup = { id: '', name: '' };
    expect(result.current.itemToDelete).toEqual(defaultLookup);
  });

  // Probamos que en onClose se setea isOpen a false
  it('should update isOpen when it calls onClose', () => {
    // Arrange
    // No necesita parámetros de entrada

    // Act
    const { result } = renderHook(() => useConfirmationDialog());

    act(() => {
      result.current.onClose();
    });

    // Assert
    expect(result.current.isOpen).toEqual(false);
  });

  // Probamos que en onOpenDialog se setea isOpen a true e itemToDelete al item facilitado
  it('should update isOpen and itemToDelete when it calls onOpenDialog', () => {
    // Arrange
    const newItem: Lookup = { id: 'test id', name: 'test name' }

    // Act
    const { result } = renderHook(() => useConfirmationDialog());

    // Hay que englobarlo aquí cuando se modifican datos que queremos guardar
    act(() => {
      result.current.onOpenDialog(newItem);
    });

    // Assert
    expect(result.current.isOpen).toEqual(true);
    expect(result.current.itemToDelete).toEqual(newItem)
  });
});
