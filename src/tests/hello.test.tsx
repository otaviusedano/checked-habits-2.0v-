import '@testing-library/jest-dom'
import {fireEvent, render} from '@testing-library/react'

import { test, expect, describe, vi,  } from 'vitest'
import App from '../App'
import { Button } from '../components/Button'

const buttonTestId = "button"

describe('App', () => {
  // beforeEach(() => {
  //   render(<Button>Clique aqui</Button>)
  // })

  test('Should be TWO', () => {
    expect(1 + 1).toBe(2)
  })

  test('Should be render', () => {
    const { getByText } = render(<App />)

    expect(getByText('aqui')).toBeInTheDocument()
  })

  test('Should be Button', () => {
    const { getByTestId } = render(<Button>Clique aqui</Button>)

    expect(getByTestId(buttonTestId)).toBeInTheDocument()
  })

  test('Should be text equal "Clique aqui"', () => {
    const { getByTestId } = render(<Button>Clique aqui</Button>)

    expect(getByTestId(buttonTestId)).toHaveTextContent('Clique aqui')
  })

  test('Should be able to fire event', () => {
    const handleClick = vi.fn()

    const { getByTestId } = render(<Button onClick={handleClick}>Clique aqui</Button>)

    fireEvent.click(getByTestId(buttonTestId))

    expect(handleClick).toBeCalledTimes(1)
  })

  test('Should Have styles', () => {
    const { getByTestId } = render(<Button>Clique aqui</Button>)
    
    expect(getByTestId(buttonTestId)).toHaveClass('button')
  })

  test('Should Have icone', () => {
    const { getByTestId } = render(<Button>🤣</Button>)

    expect(getByTestId(buttonTestId)).toHaveTextContent('🤣')
  })
})