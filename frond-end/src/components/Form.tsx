import { useForm } from '@tanstack/react-form'
import { Input } from './ui/8bit/input'
import { Button } from './ui/8bit/button'

type FormUrlProps = {
  onSuccess?: () => void
}

export default function FormUrl({ onSuccess }: FormUrlProps) {
  const backendUrl = (import.meta as any).env?.VITE_BACKEND_URL || (import.meta as any).env?.BACKEND_URL || 'http://localhost:3030'

  const form = useForm({
    defaultValues: { url: '' },
    onSubmit: async ({ value }) => {
      try {
        const response = await fetch(`${backendUrl}/shorted`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            url: value.url,
            user_id: 1,
          }),
        })

        if (!response.ok) {
          throw new Error(`Server error: ${response.status}`)
        }

        const result = await response.json()
        console.log('Shortened response:', result)
        onSuccess?.()
      } catch (error) {
        console.error('Failed to submit URL:', error)
      }
    },
  })

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault()
        event.stopPropagation()
        form.handleSubmit()
      }}
    >
      <form.Field
        name="url"
        validators={{
          onChange: ({ value }) =>
            /^https?:\/\//i.test(value) ? undefined : 'Must be Https://',
        }}
        children={(field) => (
          <>
            {!field.state.meta.isValid && (
              <em>{field.state.meta.errors.join(', ')}</em>
            )}
            <Input
              value={field.state.value}
              name={field.name}
              type="text"
              placeholder='https://'
              onBlur={field.handleBlur}
              onChange={(event) =>
                field.handleChange(event.target.value)
              }
            />
          </>
        )}
      />
      <form.Subscribe
        selector={(state) => [state.canSubmit, state.isSubmitting]}
        children={([canSubmit, isSubmitting]) => (
          <Button className='cursor-pointer' type="submit" disabled={!canSubmit}>
            {isSubmitting ? '...' : 'Submit!'}
          </Button>
        )}
      />
    </form>
  )
}