const DATABASE_KEY = 'pesaflow_mock_database'

const createId = (prefix) => `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`

export const ADMIN_EMAIL = 'admin@gmail.com'
export const ADMIN_PASSWORD = 'admin1234'

const DEMO_USERS = [
  { id: 'demo-mason', fullName: 'Mason', email: 'mason@gmail.com', phone: '0711000001', password: 'mason1234', balance: 18450 },
  { id: 'demo-myles', fullName: 'Myles', email: 'myles@gmail.com', phone: '0711000002', password: 'myles1234', balance: 26300 },
  { id: 'demo-nasra', fullName: 'Nasra', email: 'nasra@gmail.com', phone: '0711000003', password: 'nasra1234', balance: 12750 },
  { id: 'demo-naomi', fullName: 'Naomi', email: 'naomi@gmail.com', phone: '0711000004', password: 'naomi1234', balance: 32100 },
]

const SUPPORT_NAMES = [
  'Aisha Mohammed', 'Brian Otieno', 'Grace Wanjiku', 'John Kamau', 'Winnie Achieng', 'Kevin Mwangi',
  'Lucy Njeri', 'Daniel Kiptoo', 'Faith Atieno', 'Samuel Kariuki', 'Irene Wambui', 'Victor Ouma',
  'Cynthia Chebet', 'David Omondi', 'Mercy Nyambura', 'Allan Mutua', 'Sharon Jepchirchir', 'Collins Maina',
  'Esther Naliaka', 'Dennis Kibet', 'Miriam Adhiambo', 'Felix Kimani', 'Ruth Wairimu', 'George Ochieng',
  'Janet Muthoni', 'Peter Kiplagat', 'Beatrice Auma', 'Martin Were', 'Caroline Wekesa', 'Joseph Ndungu',
  'Lilian Moraa', 'Mark Kipkorir', 'Agnes Wanjiru', 'Hassan Abdullahi', 'Violet Nakhumicha', 'Robert Macharia',
]

const KEY_TRANSACTION_AMOUNTS = [450, 700, 900, 1200, 600, 850, 1100, 750]
const KEY_TRANSACTION_TARGETS = {
  'demo-mason': 42,
  'demo-myles': 47,
  'demo-nasra': 40,
  'demo-naomi': 49,
}

const daysAgo = (days) => {
  const date = new Date()
  date.setDate(date.getDate() - days)
  return date.toISOString()
}

const createDemoData = (demoUser) => {
  const contacts = [
    { name: 'John Kamau', phone: '0712345678', bank: 'KCB' },
    { name: 'Mary Wanjiku', phone: '0798765432', bank: 'Equity Bank' },
    { name: 'Peter Ochieng', phone: '0744111222', bank: 'Co-op Bank' },
  ]
  const statuses = ['successful', 'successful', 'pending', 'successful', 'failed', 'successful', 'successful', 'successful']
  const userIndex = DEMO_USERS.findIndex((user) => user.id === demoUser.id)

  return {
    beneficiaries: contacts.map((contact, index) => ({
      id: `${demoUser.id}-beneficiary-${index + 1}`,
      userId: demoUser.id,
      ...contact,
      accountType: 'individual',
    })),
    transactions: KEY_TRANSACTION_AMOUNTS.map((amount, index) => {
      const contact = contacts[index % contacts.length]
      const type = index % 3 === 1 ? 'received' : 'sent'
      const fee = type === 'sent' ? 10 : 0
      const transactionDate = daysAgo(3 + ((userIndex * 3 + index * 10) % 85))
      return {
        id: `${demoUser.id}-transaction-${index + 1}`,
        ownerId: demoUser.id,
        recipient: contact.name,
        recipientPhone: contact.phone,
        amount,
        fee,
        total: amount + fee,
        type,
        status: statuses[index],
        date: transactionDate,
        createdAt: transactionDate,
        description: type === 'sent' ? `Transfer to ${contact.name}` : `Received from ${contact.name}`,
      }
    }),
  }
}

export const createUserRecord = ({ id, fullName, email, phone = '', role = 'user', password = '' }) => ({
  id: id || (role === 'admin' ? 'demo-admin' : createId('user')),
  fullName: fullName || (role === 'admin' ? 'PesaFlow Admin' : 'PesaFlow User'),
  email: email || '',
  phone: phone || '',
  role,
  password,
  status: 'Active',
  createdAt: new Date().toISOString(),
  twoFactorEnabled: false,
})

const createEmptyDatabase = () => ({
  users: [createUserRecord({ email: ADMIN_EMAIL, fullName: 'PesaFlow Admin', role: 'admin', password: ADMIN_PASSWORD })],
  wallets: {},
  beneficiaries: {},
  transactions: [],
})

const seedDemoUsers = (database) => {
  let changed = false

  DEMO_USERS.forEach((demoUser) => {
    const existingIndex = database.users.findIndex((user) => user.id === demoUser.id || user.email.toLowerCase() === demoUser.email)
    const existingUser = existingIndex === -1 ? null : database.users[existingIndex]
    const demoData = createDemoData(demoUser)

    if (!existingUser) {
      database.users.push(createUserRecord({ ...demoUser, role: 'user' }))
      database.wallets[demoUser.id] = { balance: demoUser.balance, currency: 'KES', accountNumber: `PF-${demoUser.id.slice(-5).toUpperCase()}` }
      database.beneficiaries[demoUser.id] = demoData.beneficiaries
      database.transactions.push(...demoData.transactions)
      changed = true
      return
    }

    if (existingUser.id !== demoUser.id) {
      database.wallets[demoUser.id] = database.wallets[existingUser.id] || { balance: demoUser.balance, currency: 'KES', accountNumber: `PF-${demoUser.id.slice(-5).toUpperCase()}` }
      database.beneficiaries[demoUser.id] = database.beneficiaries[existingUser.id] || demoData.beneficiaries
      database.transactions = database.transactions.map((transaction) => transaction.ownerId === existingUser.id ? { ...transaction, ownerId: demoUser.id } : transaction)
      delete database.wallets[existingUser.id]
      delete database.beneficiaries[existingUser.id]
      database.users[existingIndex] = { ...existingUser, id: demoUser.id }
      changed = true
    }

    const userTransactions = database.transactions.filter((transaction) => transaction.ownerId === demoUser.id)
    if (!database.wallets[demoUser.id]) {
      database.wallets[demoUser.id] = { balance: demoUser.balance, currency: 'KES', accountNumber: `PF-${demoUser.id.slice(-5).toUpperCase()}` }
      changed = true
    }
    if (!userTransactions.length) {
      database.transactions.push(...demoData.transactions)
      changed = true
    }

    const userBeneficiaries = database.beneficiaries[demoUser.id] || []
    if (!userBeneficiaries.length) {
      database.beneficiaries[demoUser.id] = demoData.beneficiaries
      changed = true
    }

    if (database.users[existingIndex]?.email !== demoUser.email || database.users[existingIndex]?.password !== demoUser.password) {
      database.users[existingIndex] = { ...database.users[existingIndex], email: demoUser.email, password: demoUser.password, fullName: demoUser.fullName, phone: demoUser.phone }
      changed = true
    }
  })

  return changed
}

const normaliseKeyTransactions = (database) => {
  let changed = false

  DEMO_USERS.forEach((demoUser, userIndex) => {
    database.transactions
      .filter((transaction) => transaction.ownerId === demoUser.id && transaction.id.startsWith(`${demoUser.id}-transaction-`))
      .forEach((transaction, index) => {
        const amount = KEY_TRANSACTION_AMOUNTS[index % KEY_TRANSACTION_AMOUNTS.length]
        const type = index % 3 === 1 ? 'received' : 'sent'
        const fee = type === 'sent' ? 10 : 0
        const transactionDate = daysAgo(3 + ((userIndex * 3 + index * 10) % 85))
        const sameDate = transaction.date && new Date(transaction.date).toDateString() === new Date(transactionDate).toDateString()
        if (transaction.amount !== amount || transaction.fee !== fee || !sameDate) {
          transaction.amount = amount
          transaction.fee = fee
          transaction.total = amount + fee
          transaction.type = type
          transaction.date = transactionDate
          transaction.createdAt = transactionDate
          changed = true
        }
      })
  })

  return changed
}

const seedTransactionHistory = (database) => {
  let changed = false
  const keyUserIds = new Set(DEMO_USERS.map((user) => user.id))
  const customerUsers = database.users.filter((user) => user.role !== 'admin')

  customerUsers.forEach((user, userIndex) => {
    const currentTransactions = database.transactions.filter((transaction) => transaction.ownerId === user.id)
    const target = KEY_TRANSACTION_TARGETS[user.id] || 14 + ((userIndex * 3) % 17)
    const amountBase = keyUserIds.has(user.id) ? 350 : 10000

    for (let sequence = currentTransactions.length; sequence < target; sequence += 1) {
      const amount = keyUserIds.has(user.id)
        ? amountBase + ((userIndex * 37 + sequence * 53) % 900)
        : amountBase + ((userIndex * 2113 + sequence * 1729) % 40001)
      const type = sequence % 4 === 1 ? 'received' : 'sent'
      const fee = type === 'sent' ? 10 : 0
      const transactionDate = daysAgo((userIndex * 2 + sequence * 2) % 85)
      database.transactions.push({
        id: `${user.id}-transaction-${sequence + 1}`,
        ownerId: user.id,
        recipient: type === 'received' ? 'Local payment' : 'Everyday expenses',
        recipientPhone: '0712345678',
        amount,
        fee,
        total: amount + fee,
        type,
        status: sequence % 11 === 0 ? 'pending' : sequence % 13 === 0 ? 'failed' : 'successful',
        date: transactionDate,
        createdAt: transactionDate,
        description: type === 'received' ? 'Received payment' : 'Account transfer',
      })
      changed = true
    }
  })

  return changed
}

const normaliseSupportTransactions = (database) => {
  let changed = false
  const keyUserIds = new Set(DEMO_USERS.map((user) => user.id))
  const supportUsers = database.users.filter((user) => user.role !== 'admin' && !keyUserIds.has(user.id))

  supportUsers.forEach((user, userIndex) => {
    database.transactions
      .filter((transaction) => transaction.ownerId === user.id && transaction.id.startsWith(`${user.id}-transaction-`))
      .forEach((transaction, index) => {
        const amount = 10000 + ((userIndex * 2113 + index * 1729) % 40001)
        if (transaction.amount !== amount) {
          transaction.amount = amount
          transaction.total = amount + Number(transaction.fee || 0)
          changed = true
        }
      })
  })

  return changed
}

const normaliseTrendDates = (database) => {
  let changed = false
  const customerUsers = database.users.filter((user) => user.role !== 'admin')

  customerUsers.forEach((user, userIndex) => {
    database.transactions
      .filter((transaction) => transaction.ownerId === user.id && transaction.id.startsWith(`${user.id}-transaction-`))
      .slice(0, 7)
      .forEach((transaction, index) => {
        const targetDate = daysAgo((userIndex + index) % 7)
        const sameDate = transaction.date && new Date(transaction.date).toDateString() === new Date(targetDate).toDateString()
        if (!sameDate) {
          transaction.date = targetDate
          transaction.createdAt = targetDate
          changed = true
        }
      })
  })

  return changed
}

const seedSupportUsers = (database) => {
  let changed = false
  const keyUserIds = new Set(DEMO_USERS.map((user) => user.id))
  const supportUsers = database.users.filter((user) => user.role !== 'admin' && !keyUserIds.has(user.id))

  while (supportUsers.length < SUPPORT_NAMES.length) {
    const index = supportUsers.length
    const fullName = SUPPORT_NAMES[index]
    const user = createUserRecord({
      id: `support-${String(index + 1).padStart(2, '0')}`,
      fullName,
      email: `support${index + 1}@gmail.com`,
      phone: `072${String(index + 1).padStart(7, '0')}`,
      password: `support${index + 1}1234`,
    })
    database.users.push(user)
    user.createdAt = daysAgo(1 + ((index * 2) % 85))
    database.wallets[user.id] = { balance: 250 + index * 40, currency: 'KES', accountNumber: `PF-SUPPORT${String(index + 1).padStart(2, '0')}` }
    database.beneficiaries[user.id] = []
    supportUsers.push(user)
    changed = true
  }

  supportUsers.forEach((user, index) => {
    const fullName = SUPPORT_NAMES[index] || `Customer ${index + 1}`
    const createdAt = daysAgo(1 + ((index * 2) % 85))
    const createdToday = user.createdAt && new Date(user.createdAt).toDateString() === new Date().toDateString()
    if (user.fullName !== fullName || !user.status || !user.createdAt || createdToday) {
      user.fullName = fullName
      user.status = user.status || 'Active'
      user.createdAt = createdToday ? createdAt : user.createdAt
      changed = true
    }
    if (!database.wallets[user.id]) {
      database.wallets[user.id] = { balance: 250 + index * 40, currency: 'KES', accountNumber: `PF-SUPPORT${String(index + 1).padStart(2, '0')}` }
      changed = true
    }
    if (!database.transactions.some((transaction) => transaction.ownerId === user.id)) {
      const amount = 250 + index * 35
      database.transactions.push({
        id: `${user.id}-transaction-1`,
        ownerId: user.id,
        recipient: index % 2 ? 'Local services' : 'Daily expenses',
        recipientPhone: '0712345678',
        amount,
        fee: 10,
        total: amount + 10,
        type: 'sent',
        status: index % 5 === 0 ? 'pending' : index % 7 === 0 ? 'failed' : 'successful',
        date: daysAgo((index * 3) % 85),
        createdAt: daysAgo((index * 3) % 85),
        description: 'Everyday account activity',
      })
      changed = true
    }

    if (index === 0 && !database.transactions.some((transaction) => transaction.ownerId === user.id && new Date(transaction.date || transaction.createdAt).getTime() >= Date.now() - 24 * 60 * 60 * 1000)) {
      const recentTransaction = database.transactions.find((transaction) => transaction.ownerId === user.id)
      if (recentTransaction) {
        recentTransaction.date = daysAgo(0)
        recentTransaction.createdAt = recentTransaction.date
        changed = true
      }
    }
  })

  return changed
}

export const readDatabase = () => {
  if (typeof window === 'undefined') return createEmptyDatabase()

  try {
    const stored = window.localStorage.getItem(DATABASE_KEY)
    if (!stored) {
      const database = createEmptyDatabase()
      seedDemoUsers(database)
      seedSupportUsers(database)
      seedTransactionHistory(database)
      normaliseTrendDates(database)
      window.localStorage.setItem(DATABASE_KEY, JSON.stringify(database))
      return database
    }

    const storedDatabase = JSON.parse(stored)
    const database = {
      ...createEmptyDatabase(),
      ...storedDatabase,
      users: Array.isArray(storedDatabase.users) ? storedDatabase.users : [],
      wallets: storedDatabase.wallets || {},
      beneficiaries: storedDatabase.beneficiaries || {},
      transactions: Array.isArray(storedDatabase.transactions) ? storedDatabase.transactions : [],
    }
    let changed = seedDemoUsers(database)
    changed = normaliseKeyTransactions(database) || changed
    changed = seedSupportUsers(database) || changed
    changed = seedTransactionHistory(database) || changed
    changed = normaliseSupportTransactions(database) || changed
    changed = normaliseTrendDates(database) || changed
    if (changed) saveDatabase(database)
    return database
  } catch {
    return createEmptyDatabase()
  }
}

export const saveDatabase = (database) => {
  if (typeof window !== 'undefined') {
    window.localStorage.setItem(DATABASE_KEY, JSON.stringify(database))
  }
  return database
}

export const findUser = (identifier) => {
  const normalizedIdentifier = identifier.trim().toLowerCase()
  return readDatabase().users.find((user) =>
    user.status !== 'Inactive' && (user.email.toLowerCase() === normalizedIdentifier || user.phone === identifier.trim()),
  )
}

export const registerMockUser = (details) => {
  const database = readDatabase()
  const email = details.email.trim().toLowerCase()
  if (database.users.some((user) => user.email.toLowerCase() === email)) {
    throw new Error('An account with that email already exists.')
  }

  const user = createUserRecord({ ...details, email, role: 'user' })
  database.users.push(user)
  database.wallets[user.id] = { balance: 0, currency: 'KES', accountNumber: `PF-${user.id.slice(-8).toUpperCase()}` }
  database.beneficiaries[user.id] = []
  saveDatabase(database)
  return user
}

export const getUserWallet = (userId) => readDatabase().wallets[userId] || { balance: 0, currency: 'KES', accountNumber: null }
export const getUserBeneficiaries = (userId) => readDatabase().beneficiaries[userId] || []
export const getAllUsers = () => {
  const database = readDatabase()
  return database.users.map((user) => ({
    ...user,
    balance: database.wallets[user.id]?.balance || 0,
    transactionCount: database.transactions.filter((transaction) => transaction.ownerId === user.id).length,
    beneficiaryCount: (database.beneficiaries[user.id] || []).length,
    status: user.status || 'Active',
  }))
}

export const updateUserStatus = (userId, status) => {
  const database = readDatabase()
  const user = database.users.find((candidate) => candidate.id === userId)
  if (!user || user.role === 'admin') return null
  user.status = status === 'Inactive' ? 'Inactive' : 'Active'
  saveDatabase(database)
  return user
}
export const getAllTransactions = () => {
  const database = readDatabase()
  return database.transactions.map((transaction) => ({
    ...transaction,
    sender: transaction.sender || database.users.find((user) => user.id === transaction.ownerId)?.fullName || 'Customer',
  }))
}
export const getUserTransactions = (userId) => getAllTransactions().filter((transaction) => transaction.ownerId === userId)

export const updateUserWallet = (userId, changes) => {
  const database = readDatabase()
  database.wallets[userId] = { ...getUserWallet(userId), ...changes }
  saveDatabase(database)
  return database.wallets[userId]
}

export const updateUserBeneficiaries = (userId, beneficiaries) => {
  const database = readDatabase()
  database.beneficiaries[userId] = beneficiaries
  saveDatabase(database)
  return beneficiaries
}

export const addMockTransaction = (transaction) => {
  const database = readDatabase()
  const nextTransaction = { id: createId('tx'), createdAt: new Date().toISOString(), ...transaction }
  database.transactions.unshift(nextTransaction)
  saveDatabase(database)
  return nextTransaction
}
