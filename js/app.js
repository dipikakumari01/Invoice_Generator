function getShopSettings() {
    const settingsJson = localStorage.getItem('shopSettings');
    if (settingsJson) {
        return JSON.parse(settingsJson);
    }

    return {
        shopName: 'Mahalaxmi Jewellers',
        shopEmail: 'info@mahalaxmijewellers.com',
        gstin: '29AAAAA0000A1Z5',
        defaultBranch: 'branch1',
        goldRate: 6500,
        silverRate: 75,
        purityOptions: ['24K', '22K', '18K', '999', '925'],
        makingChargeType: 'per_gram',
        makingChargeValue: 500,
        gstPercentage: 3
    };
}

function saveShopSettings(settings) {
    localStorage.setItem('shopSettings', JSON.stringify(settings));
}

function generateInvoiceNumber() {
    const now = new Date();
    const year = now.getFullYear().toString().slice(-2);
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');

    const invoices = getAllInvoices();
    const todayInvoices = invoices.filter(inv => {
        const invDate = new Date(inv.date);
        return invDate.toDateString() === now.toDateString();
    });

    const sequence = String(todayInvoices.length + 1).padStart(3, '0');

    return `INV${year}${month}${day}${sequence}`;
}

function saveInvoice(invoiceData) {
    const invoices = getAllInvoices();
    invoices.push(invoiceData);
    localStorage.setItem('invoices', JSON.stringify(invoices));
}

function getAllInvoices() {
    const invoicesJson = localStorage.getItem('invoices');
    if (invoicesJson) {
        return JSON.parse(invoicesJson);
    }
    return [];
}

function getInvoiceByNumber(invoiceNo) {
    const invoices = getAllInvoices();
    return invoices.find(inv => inv.invoiceNo === invoiceNo);
}

function deleteInvoiceByNumber(invoiceNo) {
    const invoices = getAllInvoices();
    const updatedInvoices = invoices.filter(inv => inv.invoiceNo !== invoiceNo);
    localStorage.setItem('invoices', JSON.stringify(updatedInvoices));
}
// 🔐 Initialize default login credentials (runs once)
if (!localStorage.getItem('authInitialized')) {
  localStorage.setItem('username', 'admin');
  localStorage.setItem('password', 'admin123');
  localStorage.setItem('authInitialized', 'true');
}

function checkAuthentication() {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (isLoggedIn !== 'true') {
        window.location.href = 'index.html';
    }
}

function logout() {
    localStorage.removeItem('isLoggedIn');
    window.location.href = 'index.html';
}

function formatCurrency(amount) {
    return '₹' + parseFloat(amount).toFixed(2);
}

function formatDate(dateStr) {
    const date = new Date(dateStr);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
}

function initializeSampleData() {
    const invoices = getAllInvoices();
    if (invoices.length === 0) {
        const sampleInvoices = [
            {
                invoiceNo: 'INV240101001',
                date: '2024-01-15',
                customerName: 'Rajesh Kumar',
                customerMobile: '+91 9876543210',
                customerAddress: '45, Brigade Road, Bangalore - 560001',
                paymentMode: 'Cash',
                items: [
                    {
                        sno: 1,
                        name: 'Gold Necklace',
                        metal: 'Gold',
                        purity: '22K',
                        grossWeight: 25.5,
                        netWeight: 24.8,
                        rate: 6500,
                        making: 12400
                    }
                ],
                subtotal: 173600,
                cgst: 2604,
                sgst: 2604,
                grandTotal: 178808
            },
            {
                invoiceNo: 'INV240102001',
                date: '2024-01-16',
                customerName: 'Priya Sharma',
                customerMobile: '+91 9988776655',
                customerAddress: '78, Koramangala, Bangalore - 560034',
                paymentMode: 'UPI',
                items: [
                    {
                        sno: 1,
                        name: 'Gold Bangles',
                        metal: 'Gold',
                        purity: '22K',
                        grossWeight: 35.2,
                        netWeight: 34.5,
                        rate: 6500,
                        making: 17250
                    },
                    {
                        sno: 2,
                        name: 'Gold Earrings',
                        metal: 'Gold',
                        purity: '22K',
                        grossWeight: 8.5,
                        netWeight: 8.2,
                        rate: 6500,
                        making: 4100
                    }
                ],
                subtotal: 298650,
                cgst: 4479.75,
                sgst: 4479.75,
                grandTotal: 307609.50
            }
        ];

        localStorage.setItem('invoices', JSON.stringify(sampleInvoices));
    }

    const settings = localStorage.getItem('shopSettings');
    if (!settings) {
        saveShopSettings(getShopSettings());
    }
}


    if (typeof window !== 'undefined') {
    window.addEventListener('DOMContentLoaded', () => {
        initializeSampleData();
    });
}

