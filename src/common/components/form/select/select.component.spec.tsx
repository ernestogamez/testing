import React from "react"
import { render, screen } from '@testing-library/react'
import { SelectComponent } from "./select.component"
import { Lookup } from "common/models"
import userEvent from '@testing-library/user-event'

describe('common/components/form/select/Select.component specs', () => {
  // Simulamos que se renderiza un select con 3 opciones
  it('should render a select element when it feeds required props and three items', ()=> {
    // Arrange
    const props = {
      items: [
        { id: '1', name: 'Item 1 '},
        { id: '2', name: 'Item 2 '},
        { id: '3', name: 'Item 3 '},
      ] as Lookup[],
      label: 'Test label',
      value: ''
    }

    // Act
    render(<SelectComponent {...props} />)

    // El select tiene rol button (mirar en la web -> Inspeccionar elemento)
    const selectElement = screen.getByRole('button')
    // screen.debug()

    // Assert
    expect(selectElement).toBeInTheDocument()
  })

  // Debe desplegar un menú con 3 elementos y seleccionar uno
  it('should render a menu with three item when it clicks on select element', async ()=> {
    // Arrange
    const props = {
      items: [
        { id: '1', name: 'Item 1 '},
        { id: '2', name: 'Item 2 '},
        { id: '3', name: 'Item 3 '},
      ] as Lookup[],
      label: 'Test label',
      value: ''
    }

    // Act
    render(<SelectComponent {...props} />)

    // El select tiene rol button (mirar en la web)
    const selectElement = screen.getByRole('button')
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument

    // Simulo el click en el elemento select y tiene que desplegar el menú
    await userEvent.click(selectElement)

    // El menú tiene rol listbox
    const menuElement = screen.getByRole('listbox')

    // Recuperamos los elementos del menú
    const itemElementList = screen.getAllByRole('option')

    // Assert
    expect(menuElement).toBeInTheDocument() // El menú debe aparecer por pantalla
    expect(itemElementList).toHaveLength(3)
  })
})
