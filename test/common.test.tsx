import * as React from 'react'
import { render } from '@testing-library/react'

import 'jest-canvas-mock'

import { useDirectory } from '../src/index'

describe('Common NavBar', () => {
  const Dir = useDirectory()
  it('renders NavBar without crashing', () => {
    render(<Dir.NavBar />)
  })
  it('renders Pages without crashing', () => {
    render(<Dir.Pages />)
  })
})
