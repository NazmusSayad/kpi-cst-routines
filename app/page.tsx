'use client'

import getClassName from 'get-classnames'
try {
  globalThis.$cn = getClassName
  window.$cn = getClassName
} catch {}
declare global {
  var $cn: typeof getClassName
}

import Wrapper from '@/src/layouts/Wrapper'
import Input from '@/src/features/Input'

const App = () => {
  return (
    <Wrapper>
      <Input />
    </Wrapper>
  )
}

export default App
