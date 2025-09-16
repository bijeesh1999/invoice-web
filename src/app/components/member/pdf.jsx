"use client";

import React from 'react';
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Font,
} from '@react-pdf/renderer';

// Register a font to avoid font-related errors
Font.register({
  family: 'Roboto',
  src: 'https://cdnjs.cloudflare.com/ajax/libs/ink/1.0.0/fonts/Roboto/roboto-light-webfont.ttf',
});

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#fff',
    padding: 30,
    fontFamily: 'Roboto',
  },
  header: {
    marginBottom: 20,
    textAlign: 'center',
  },
  invoiceDetails: {
    marginBottom: 20,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  table: {
    display: 'table',
    width: 'auto',
    marginBottom: 20,
  },
  tableRow: {
    flexDirection: 'row',
  },
  tableHeader: {
    backgroundColor: '#f0f0f0',
    fontWeight: 'bold',
  },
  tableCell: {
    margin: 'auto',
    marginTop: 5,
    marginBottom: 5,
    fontSize: 10,
    padding: 5,
    borderBottom: '1px solid #eee',
  },
  totalSection: {
    flexDirection: 'column',
    alignItems: 'flex-end',
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 200,
    marginTop: 5,
  },
  grandTotal: {
    borderTop: '1px solid #000',
    paddingTop: 5,
    marginTop: 5,
    fontWeight: 'bold',
  },
});

const InvoicePDF = ({ data }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.header}>
        <Text style={{ fontSize: 24, fontWeight: 'bold' }}>Invoice</Text>
        <Text style={{ fontSize: 12 }}>{data.invoiceNumber}</Text>
      </View>

      <View style={styles.invoiceDetails}>
        <View style={styles.detailRow}>
          <Text style={{ fontSize: 12 }}>Customer: {data.customerName}</Text>
          <Text style={{ fontSize: 12 }}>Date: {data.date}</Text>
        </View>
      </View>

      <View style={styles.table}>
        <View style={[styles.tableRow, styles.tableHeader]}>
          <Text style={[styles.tableCell, { flex: 4 }]}>Product</Text>
          <Text style={[styles.tableCell, { flex: 2 }]}>Price</Text>
          <Text style={[styles.tableCell, { flex: 2 }]}>Qty</Text>
          <Text style={[styles.tableCell, { flex: 2, textAlign: 'right' }]}>Amount</Text>
        </View>
        {data.items.map((item, index) => (
          <View style={styles.tableRow} key={index}>
            <Text style={[styles.tableCell, { flex: 4 }]}>
              {item.productName}
            </Text>
            <Text style={[styles.tableCell, { flex: 2 }]}>${item.price.toFixed(2)}</Text>
            <Text style={[styles.tableCell, { flex: 2 }]}>{item.quantity}</Text>
            <Text style={[styles.tableCell, { flex: 2, textAlign: 'right' }]}>
              ${item.amount.toFixed(2)}
            </Text>
          </View>
        ))}
      </View>

      <View style={styles.totalSection}>
        <View style={styles.totalRow}>
          <Text>Subtotal:</Text>
          <Text>${data.subtotal.toFixed(2)}</Text>
        </View>
        <View style={styles.totalRow}>
          <Text>Tax:</Text>
          <Text>${data.tax.toFixed(2)}</Text>
        </View>
        <View style={[styles.totalRow, styles.grandTotal]}>
          <Text style={{ fontWeight: 'bold' }}>Total:</Text>
          <Text style={{ fontWeight: 'bold' }}>${data.total.toFixed(2)}</Text>
        </View>
      </View>
    </Page>
  </Document>
);

export default InvoicePDF;