/* @flow */

import React from 'react'
import {
  render,
  cleanup,
  wait,
} from 'react-testing-library'
import { Fetch } from '.'

afterEach(cleanup)

// beforeEach(() => {
//   fetch.resetMocks()
// })

test('<Fetch /> Fulfilled', async () => {
  fetch.mockResponses(
    [
      JSON.stringify({ data: 'ok' }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      },
    ]
  )
  const renderProps = {}
  const children = (arg) => {
    Object.assign(renderProps, arg)
    return null
  }
  const { rerender } = render(
    <Fetch url='foo'>
      { children }
    </Fetch>
  )

  expect(fetch).toHaveBeenCalledTimes(1)

  renderProps.read()
  expect(fetch).toHaveBeenCalledTimes(1)

  renderProps.invalidate()
  renderProps.read()
  expect(fetch).toHaveBeenCalledTimes(2)

  renderProps.refresh()
  expect(fetch).toHaveBeenCalledTimes(3)

  rerender(<Fetch url='bar'>{ children }</Fetch>)

  expect(fetch).toHaveBeenCalledTimes(4)
})

test('<Fetch /> Rejected', async () => {
  fetch.mockResponses(
    [
      JSON.stringify({ message: 'Whoops' }),
      {
        status: 500,
        headers: {
          'Content-Type': 'text/plain',
        },
      },
    ]
  )

  const renderProps = {}
  const children = (arg) => {
    Object.assign(renderProps, arg)
    return null
  }
  const { rerender } = await render(
    <Fetch url='baz'>
      { children }
    </Fetch>
  )

  await wait(expect(renderProps.pending).toBe(true))

  rerender(<Fetch url='bar'>{ children }</Fetch>)

  expect(fetch).toHaveBeenCalledTimes(5)
})
