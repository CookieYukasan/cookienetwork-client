export default ({ $config: { isDev }, $sentry }, inject) => {
  inject('sentryCaptureException', (error) => {
    if (!isDev) {
      // @todo add sentry if need
      return
      // return $sentry.captureException(error)
    }

    console.error(error)
  })
}
