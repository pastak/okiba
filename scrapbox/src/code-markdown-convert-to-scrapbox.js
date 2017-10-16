import md2sb from 'md2sb'

window.addEventListener('paste', async (event) => {
  const pastedText = event.clipboardData.getData('text/plain')
  const converted = await md2sb(pastedText)

  if (/^[\s\t\n]*$/.test(converted) || pastedText === converted) return

  event.preventDefault()
  const element = event.target
  const value = element.value
  const replacedText = value.substr(0, element.selectionStart) + converted + value.substr(element.selectionEnd, value.length)
  element.value = replacedText

  const dummyEvent = new Event('input', {
    'bubbles': true,
    'cancelable': true
  })
  element.dispatchEvent(dummyEvent);
})
