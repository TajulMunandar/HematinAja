import { useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import gambar from "./assets/Developer-Dadakan-Logo-Concept.png";
import { TextField, IconButton } from "@mui/material";
import { HelpOutline, Refresh, Calculate } from "@mui/icons-material"; // Importing Material UI icons
import GoogleAds from "./GoogleAds";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const SavingsCalculator = () => {
  const [oldHabitCost, setOldHabitCost] = useState("");
  const [newHabitCost, setNewHabitCost] = useState("");
  const [frequency, setFrequency] = useState("1");
  const [savings, setSavings] = useState({
    weekly: 0,
    monthly: 0,
    yearly: 0,
    daily: 0,
    sixMonths: 0,
    fiveYears: 0,
  });
  const [showResults, setShowResults] = useState(false);
  const [showForm, setShowForm] = useState(true);

  // Fungsi untuk format angka menjadi format mata uang Indonesia
  const formatCurrency = (value: any) => {
    return new Intl.NumberFormat("id-ID", {
      style: "decimal",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  // Fungsi untuk menghapus simbol mata uang dan mengonversi input ke angka
  const unformatCurrency = (value: any) => {
    return value.replace(/[^\d]/g, ""); // Hapus semua selain angka
  };

  const calculateSavings = () => {
    const oldCost = parseFloat(oldHabitCost);
    const newCost = parseFloat(newHabitCost);
    const freq = parseInt(frequency, 10);

    if (isNaN(oldCost) || isNaN(newCost) || isNaN(freq)) {
      alert("Masukkan angka valid untuk semua input.");
      return;
    }

    const weekly = (oldCost - newCost) * freq;
    const daily = weekly / 7;
    const monthly = weekly * 4.33; // rata-rata minggu dalam sebulan
    const yearly = weekly * 52;
    const sixMonths = monthly * 6;
    const fiveYears = yearly * 5;

    setSavings({ weekly, daily, monthly, yearly, sixMonths, fiveYears });
    setShowResults(true);
    setShowForm(false);
  };

  const resetCalculator = () => {
    setOldHabitCost("");
    setNewHabitCost("");
    setFrequency("1");
    setSavings({
      weekly: 0,
      daily: 0,
      monthly: 0,
      yearly: 0,
      sixMonths: 0,
      fiveYears: 0,
    });
    setShowResults(false);
    setShowForm(true);
  };

  const savingsChartData = {
    labels: ["Mingguan", "Bulanan", "Tahunan"],
    datasets: [
      {
        label: "Penghematan",
        data: [savings.weekly, savings.monthly, savings.yearly],
        fill: false,
        borderColor: "#28a745",
        tension: 0.1,
      },
    ],
  };

  return (
    <div className="context py-5">
      <div className="container" style={{ backgroundColor: "f9f9f9" }}>
        <div className="col-xl-8 col-lg-8 col-md-6 d-flex flex-column mx-auto">
          <div className="card shadow shadow-lg">
            <div className="card-body p-5">
              <h1 className="text-left mb-4 fs-2 fw-bold">
                KALKULATOR PENGHEMATAN
              </h1>
              <p
                className="lead text-left mb-4"
                style={{
                  fontSize: "1.2rem",
                  color: "#333",
                  background: "#f0f9ff",
                  borderLeft: "4px solid #28a745",
                  padding: "10px 20px",
                  borderRadius: "8px",
                }}
              >
                <span style={{ fontWeight: "bold", color: "#28a745" }}>
                  Mulai Perubahan, Mulai Menabung!
                </span>{" "}
                Ganti kebiasaan Anda, hitung berapa banyak uang yang bisa Anda
                simpan! Misalnya, dengan menghindari kebiasaan membeli kopi di
                luar, Anda bisa menabung lebih banyak!
              </p>

              {showForm && (
                <>
                  <div className="mb-3">
                    <label className="form-label">
                      Biaya kebiasaan lama (per sekali):
                    </label>
                    <TextField
                      fullWidth
                      variant="outlined"
                      value={`Rp. ${formatCurrency(oldHabitCost)}`}
                      onChange={(e) =>
                        setOldHabitCost(unformatCurrency(e.target.value))
                      }
                      placeholder="Masukkan biaya kebiasaan lama"
                      InputProps={{
                        endAdornment: (
                          <IconButton edge="end">
                            <HelpOutline />
                          </IconButton>
                        ),
                      }}
                      sx={{
                        borderTop: "none",
                        borderRight: "none",
                        borderLeft: "none",
                        "& .MuiOutlinedInput-root": {
                          borderTop: "none",
                          borderRight: "none",
                          borderLeft: "none",
                        },
                      }}
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">
                      Biaya kebiasaan baru (per sekali):
                    </label>
                    <TextField
                      fullWidth
                      variant="outlined"
                      value={`Rp. ${formatCurrency(newHabitCost)}`}
                      onChange={(e) =>
                        setNewHabitCost(unformatCurrency(e.target.value))
                      }
                      placeholder="Masukkan biaya kebiasaan baru"
                      InputProps={{
                        endAdornment: (
                          <IconButton edge="end">
                            <HelpOutline />
                          </IconButton>
                        ),
                      }}
                      sx={{
                        borderTop: "none",
                        borderRight: "none",
                        borderLeft: "none",
                        "& .MuiOutlinedInput-root": {
                          borderTop: "none",
                          borderRight: "none",
                          borderLeft: "none",
                        },
                      }}
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Frekuensi per minggu:</label>
                    <TextField
                      fullWidth
                      variant="outlined"
                      value={frequency}
                      onChange={(e) => setFrequency(e.target.value)}
                      placeholder="Masukkan frekuensi"
                      sx={{
                        borderTop: "none",
                        borderRight: "none",
                        borderLeft: "none",
                        "& .MuiOutlinedInput-root": {
                          borderTop: "none",
                          borderRight: "none",
                          borderLeft: "none",
                        },
                      }}
                    />
                  </div>

                  <button
                    onClick={calculateSavings}
                    className="btn btn-success me-2 w-100 rounded-pill"
                  >
                    <Calculate /> Hitung Penghematan
                  </button>
                </>
              )}

              {savings.weekly > 0 && showResults && (
                <div className="mt-4 slide-up">
                  <h3 className="text-center">Visualisasi Penghematan</h3>
                  <Line data={savingsChartData} />
                </div>
              )}

              {showResults && (
                <div className="row mt-4">
                  <div className="col-md-4">
                    <div
                      className="card shadow"
                      style={{ backgroundColor: "#e3f2fd" }}
                    >
                      <div className="card-body text-center">
                        <h5 className="card-title">Mingguan</h5>
                        <p className="card-text">
                          Rp. {formatCurrency(savings.weekly)}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="col-md-4">
                    <div
                      className="card shadow"
                      style={{ backgroundColor: "#ffeb3b" }}
                    >
                      <div className="card-body text-center">
                        <h5 className="card-title">Bulanan</h5>
                        <p className="card-text">
                          Rp. {formatCurrency(savings.monthly)}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="col-md-4">
                    <div
                      className="card shadow"
                      style={{ backgroundColor: "#81c784" }}
                    >
                      <div className="card-body text-center">
                        <h5 className="card-title">Tahunan</h5>
                        <p className="card-text">
                          Rp. {formatCurrency(savings.yearly)}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="col-md-4 mt-3">
                    <div
                      className="card shadow"
                      style={{ backgroundColor: "#f8bbd0" }}
                    >
                      <div className="card-body text-center">
                        <h5 className="card-title">Harian</h5>
                        <p className="card-text">
                          Rp. {formatCurrency(savings.daily)}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="col-md-4 mt-3">
                    <div
                      className="card shadow"
                      style={{ backgroundColor: "#c5e1a5" }}
                    >
                      <div className="card-body text-center">
                        <h5 className="card-title">6 Bulan</h5>
                        <p className="card-text">
                          Rp. {formatCurrency(savings.sixMonths)}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="col-md-4 mt-3">
                    <div
                      className="card shadow"
                      style={{ backgroundColor: "#ffd54f" }}
                    >
                      <div className="card-body text-center">
                        <h5 className="card-title">5 Tahun</h5>
                        <p className="card-text">
                          Rp. {formatCurrency(savings.fiveYears)}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {showResults && (
                <div className="mt-4">
                  <button
                    onClick={resetCalculator}
                    className="btn btn-danger w-100 rounded-pill"
                  >
                    <Refresh /> Kembali dan Reset
                  </button>
                </div>
              )}
              <div className="row mt-4">
                <div className="col d-flex flex-column justify-content-center align-items-center">
                  <span className="mb-2">Powered By</span>
                  <img
                    src={gambar}
                    alt="Deskripsi gambar"
                    className="img-fluid w-25"
                  />
                </div>
              </div>
              <hr />
              <div className="text-center mb-4">
                <GoogleAds />
              </div>
              <hr />

              <div className="mt-5">
                <h3 className="text-center text-primary mb-4">
                  Tips & Teori Penghematan
                </h3>

                <div className="row d-flex justify-content-center">
                  {/* Card 1: Tips Mengubah Kebiasaan Kecil */}
                  <div className="col-md-12 mb-4">
                    <div
                      className="card p-4"
                      style={{
                        borderRadius: "15px",
                        backgroundColor: "#ffffff",
                      }}
                    >
                      <h5 className="text-primary mb-3">
                        1. Mengubah Kebiasaan Kecil
                      </h5>
                      <p
                        style={{
                          fontSize: "1.1rem",
                          color: "#555",
                          lineHeight: "1.6",
                          fontWeight: "500",
                        }}
                      >
                        Dengan mengganti kebiasaan kecil, seperti tidak membeli
                        kopi setiap hari, Anda bisa menabung lebih banyak dan
                        melihat hasilnya dalam jangka panjang. Setiap rupiah
                        yang Anda hemat adalah langkah lebih dekat menuju tujuan
                        finansial Anda. Jangan pernah meremehkan kekuatan
                        kebiasaan kecil yang konsisten!
                      </p>
                    </div>
                  </div>

                  {/* Card 2: Penghematan untuk Masa Depan */}
                  <div className="col-md-12 mb-4">
                    <div
                      className="card p-4"
                      style={{
                        borderRadius: "15px",
                        backgroundColor: "#ffffff",
                      }}
                    >
                      <h5 className="text-primary mb-3">
                        2. Penghematan untuk Masa Depan
                      </h5>
                      <p
                        style={{
                          fontSize: "1.1rem",
                          color: "#555",
                          lineHeight: "1.6",
                          fontWeight: "500",
                        }}
                      >
                        Penghematan bukan hanya tentang mengurangi pengeluaran,
                        tetapi juga tentang bagaimana Anda memanfaatkan waktu
                        dan uang untuk masa depan yang lebih baik. Cobalah untuk
                        memvisualisasikan tujuan finansial Anda dan bagaimana
                        perubahan kebiasaan ini akan membantu Anda mencapainya.
                      </p>
                    </div>
                  </div>

                  {/* Card 3: Mengelola Pengeluaran */}
                  <div className="col-md-12 mb-4">
                    <div
                      className="card p-4"
                      style={{
                        borderRadius: "15px",
                        backgroundColor: "#ffffff",
                      }}
                    >
                      <h5 className="text-primary mb-3">
                        3. Mengelola Pengeluaran
                      </h5>
                      <p
                        style={{
                          fontSize: "1.1rem",
                          color: "#555",
                          lineHeight: "1.6",
                          fontWeight: "500",
                        }}
                      >
                        Anda perlu memantau pengeluaran harian Anda untuk
                        melihat di mana uang Anda pergi. Dengan menggunakan
                        aplikasi pengelolaan keuangan atau membuat anggaran,
                        Anda dapat mengetahui pengeluaran yang tidak perlu dan
                        mulai menguranginya. Ini akan membantu Anda menabung
                        lebih banyak.
                      </p>
                    </div>
                  </div>

                  {/* Card 4: Menabung Secara Rutin */}
                  <div className="col-md-12 mb-4">
                    <div
                      className="card p-4"
                      style={{
                        borderRadius: "15px",
                        backgroundColor: "#ffffff",
                      }}
                    >
                      <h5 className="text-primary mb-3">
                        4. Menabung Secara Rutin
                      </h5>
                      <p
                        style={{
                          fontSize: "1.1rem",
                          color: "#555",
                          lineHeight: "1.6",
                          fontWeight: "500",
                        }}
                      >
                        Salah satu cara terbaik untuk menabung adalah dengan
                        menyisihkan sejumlah uang setiap bulan, bahkan jika itu
                        jumlahnya kecil. Menabung secara rutin akan membantu
                        Anda membangun dana darurat dan mencapai tujuan
                        finansial Anda tanpa merasa terbebani.
                      </p>
                    </div>
                  </div>

                  {/* Card 5: Investasi untuk Masa Depan */}
                  <div className="col-md-12 mb-4">
                    <div
                      className="card p-4"
                      style={{
                        borderRadius: "15px",
                        backgroundColor: "#ffffff",
                      }}
                    >
                      <h5 className="text-primary mb-3">
                        5. Investasi untuk Masa Depan
                      </h5>
                      <p
                        style={{
                          fontSize: "1.1rem",
                          color: "#555",
                          lineHeight: "1.6",
                          fontWeight: "500",
                        }}
                      >
                        Investasi dapat menjadi salah satu cara terbaik untuk
                        menumbuhkan kekayaan Anda dalam jangka panjang. Mulailah
                        dengan mempelajari berbagai jenis investasi yang
                        tersedia, seperti saham, reksa dana, atau properti, dan
                        pilih yang sesuai dengan profil risiko Anda.
                      </p>
                    </div>
                  </div>

                  {/* Card 6: Hindari Utang Konsumtif */}
                  <div className="col-md-12 mb-4">
                    <div
                      className="card p-4"
                      style={{
                        borderRadius: "15px",
                        backgroundColor: "#ffffff",
                      }}
                    >
                      <h5 className="text-primary mb-3">
                        6. Hindari Utang Konsumtif
                      </h5>
                      <p
                        style={{
                          fontSize: "1.1rem",
                          color: "#555",
                          lineHeight: "1.6",
                          fontWeight: "500",
                        }}
                      >
                        Utang konsumtif, seperti kartu kredit atau pinjaman
                        untuk barang-barang yang tidak penting, bisa memperburuk
                        keadaan keuangan Anda. Hindarilah utang konsumtif dan
                        fokuslah pada tabungan dan investasi untuk masa depan
                        yang lebih stabil.
                      </p>
                    </div>
                  </div>

                  {/* Card 7: Belanja Bijak */}
                  <div className="col-md-12 mb-4">
                    <div
                      className="card p-4"
                      style={{
                        borderRadius: "15px",
                        backgroundColor: "#ffffff",
                      }}
                    >
                      <h5 className="text-primary mb-3">7. Belanja Bijak</h5>
                      <p
                        style={{
                          fontSize: "1.1rem",
                          color: "#555",
                          lineHeight: "1.6",
                          fontWeight: "500",
                        }}
                      >
                        Selalu pikirkan apakah barang yang Anda beli benar-benar
                        dibutuhkan. Belanja bijak berarti hanya membeli barang
                        yang memberikan nilai atau kegunaan jangka panjang, dan
                        menghindari pengeluaran impulsif yang hanya memperburuk
                        kondisi keuangan.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* end tips */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SavingsCalculator;
