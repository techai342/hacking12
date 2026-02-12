
import React from 'react';

const TRANSACTIONS = [
  { date: '2024-05-12', desc: 'TRANSFER_OUT // 0x8A2', amount: '-$12,400.00', status: 'CONFIRMED' },
  { date: '2024-05-11', desc: 'ATM_WITHDRAWAL // HK_NODE', amount: '-$500.00', status: 'CONFIRMED' },
  { date: '2024-05-10', desc: 'INBOUND_WIRE // UNKNOWN', amount: '+$850,000.00', status: 'PENDING' },
  { date: '2024-05-08', desc: 'TRANSFER_IN // DARK_NET_PAY', amount: '+$5,200.00', status: 'CONFIRMED' },
];

const BankInterface: React.FC = () => {
  return (
    <div className="w-full h-full bg-[#050a05] text-[#00ff41] font-mono p-4 flex flex-col">
      <div className="flex justify-between items-center border-b border-[#00ff4166] pb-4 mb-4">
        <div>
          <div className="text-[10px] opacity-50 uppercase">Account Holder</div>
          <div className="text-xl font-bold tracking-tighter truncate max-w-[150px] md:max-w-none">ANONYMOUS_PROXIED_USER</div>
        </div>
        <div className="text-right">
          <div className="text-[10px] opacity-50 uppercase">Current Balance</div>
          <div className="text-xl md:text-2xl font-bold text-yellow-500">$714,393,427.82</div>
        </div>
      </div>

      {/* Main Content: Stack vertically on mobile, horizontal on desktop */}
      <div className="flex-1 flex flex-col md:flex-row gap-4 overflow-hidden">
        
        {/* Sidebar Actions */}
        <div className="w-full md:w-1/3 flex flex-col gap-2 shrink-0">
          <div className="bg-[#00ff4111] p-3 border border-[#00ff4133]">
            <div className="text-[10px] font-bold mb-2">QUICK ACTIONS</div>
            <button className="w-full text-left text-[11px] py-1 px-2 hover:bg-[#00ff41] hover:text-black transition-colors mb-1">&gt;&gt;&gt; WIRE TRANSFER</button>
            <button className="w-full text-left text-[11px] py-1 px-2 hover:bg-[#00ff41] hover:text-black transition-colors mb-1">&gt;&gt;&gt; CRYPTO_MIXER</button>
            <button className="w-full text-left text-[11px] py-1 px-2 hover:bg-[#00ff41] hover:text-black transition-colors">&gt;&gt;&gt; TERMINATE_ACCOUNT</button>
          </div>
          
          <div className="flex-1 bg-black/40 border border-[#00ff4111] p-3 text-[10px] leading-relaxed max-h-[100px] md:max-h-none overflow-y-auto">
            <span className="text-red-500 font-bold">ALERT:</span> Federal tracing units detected a discrepancy in the latest inbound wire. Transitioning funds to offshore cooling accounts recommended.
          </div>
        </div>

        {/* Transaction Table */}
        <div className="flex-1 flex flex-col border border-[#00ff4133] bg-black/20 min-h-0">
          <div className="bg-[#00ff4133] px-2 py-1 text-[10px] font-bold shrink-0">RECENT LEDGER ENTRIES</div>
          <div className="flex-1 overflow-x-auto overflow-y-auto p-2">
            <table className="w-full text-[10px] text-left border-separate border-spacing-y-2 min-w-[400px] md:min-w-0">
              <thead>
                <tr className="opacity-40">
                  <th>DATE</th>
                  <th>DESCRIPTION</th>
                  <th>AMOUNT</th>
                  <th>STATUS</th>
                </tr>
              </thead>
              <tbody>
                {TRANSACTIONS.map((t, i) => (
                  <tr key={i} className="bg-[#00ff4108] hover:bg-[#00ff411a] transition-colors cursor-pointer group">
                    <td className="p-1 font-bold">{t.date}</td>
                    <td className="p-1 opacity-80">{t.desc}</td>
                    <td className={`p-1 font-bold ${t.amount.startsWith('-') ? 'text-red-400' : 'text-green-400'}`}>{t.amount}</td>
                    <td className="p-1">
                      <span className={`px-1 border ${t.status === 'PENDING' ? 'border-yellow-500 text-yellow-500 animate-pulse' : 'border-green-500 text-green-500 opacity-60'}`}>
                        {t.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      
      <div className="mt-4 text-[9px] opacity-30 flex justify-between uppercase">
        <span>Secure Protocol: AES-256-GCM</span>
        <span>Node: SWISS-BANK-GATEWAY-09</span>
      </div>
    </div>
  );
};

export default BankInterface;
