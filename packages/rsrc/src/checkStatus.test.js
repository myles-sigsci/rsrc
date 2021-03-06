/* @flow */

import {
  cleanup,
  wait,
} from 'react-testing-library'
import checkStatus from './checkStatus'

afterEach(cleanup)

test('#checkStatus ok', async () => {
  const body = ''
  const init = {
    ok: true,
    status: 200,
    statusText: 'OK',
  }
  const res = new Response(body, init)
  await wait(() => expect(checkStatus(res)).resolves.toEqual(res))
})

/*
test('#checkStatus !ok', async () => {
  const body = ''
  const init = {
    ok: false,
    status: 404,
    statusText: 'NOT FOUND',
  }
  const res = new Response(body, init)
  await wait(() => expect(checkStatus(res)).rejects.toEqual(new Error(res.statusText)))
})
*/
