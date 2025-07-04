import dayjs from 'dayjs'
export const filterLaunches = (launches, filter, range) =>
  launches.filter(launch => {
    const date = dayjs(launch.launched)

    const inRange =
      range?.[0] && range?.[1]
        ? date.isAfter(dayjs(range[0]).startOf('day')) &&
          date.isBefore(dayjs(range[1]).endOf('day'))
        : true

    const statusMap = {
      all: true,
      upcoming: launch.status === 'Upcoming',
      success: launch.status === 'Success',
      failed: launch.status === 'Failed'
    }

    return inRange && statusMap[filter]
  })
export const formatDate = date =>
  date?.startsWith?.('Q') ? date.replace('Q', 'Quarter ') : date || ''
