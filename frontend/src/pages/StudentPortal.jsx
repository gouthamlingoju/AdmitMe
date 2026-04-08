import React, { useEffect, useMemo, useState } from "react";
import API from "../api";
import { useAuth } from "../auth/AuthContext";

const tenthBoardOptions = ["TG BSE", "CBSE", "AP BSE", "ACE and A Level", "IBDP", "ICSE", "Other"];
const twelfthBoardOptions = ["TG BIE", "CBSE", "AP BIE", "ACE and A Level", "IBDP", "ICSE", "Other"];
const casteOptions = [
  "OC",
  "BC-A",
  "BC-B",
  "BC-C",
  "BC-D",
  "BC-E",
  "SC-I",
  "SC-II",
  "SC-III",
  "ST",
];
const incomeOptions = ["Below 2.5 lakhs", "2.5 to 5 lakhs", "Above 5 lakhs"];
const bloodGroups = ["A +", "A -", "B +", "B -", "O +", "O -", "AB +", "AB -"];
const professionOptions = [
  "Public Sector",
  "Private Sector",
  "Self Employed",
  "Business",
  "Software Engineer",
  "Other",
];
const minorityTypeOptions = ["None", "Jain", "Sikh", "Christian", "Muslim", "Parsi", "Islam", "Other"];
const phTypeOptions = ["None", "Visual", "Hearing", "Ortho", "Scribe"];
const programOptions = [
  { value: "BTECH", label: "B.Tech" },
  { value: "MTECH", label: "M.Tech" },
];
const phoneCountryOptions = [
  { label: "India (+91)", value: "+91" },
  { label: "United States (+1)", value: "+1" },
  { label: "United Kingdom (+44)", value: "+44" },
  { label: "Canada (+1)", value: "+1" },
  { label: "Australia (+61)", value: "+61" },
  { label: "Germany (+49)", value: "+49" },
  { label: "France (+33)", value: "+33" },
  { label: "Singapore (+65)", value: "+65" },
  { label: "United Arab Emirates (+971)", value: "+971" },
  { label: "Saudi Arabia (+966)", value: "+966" },
  { label: "Japan (+81)", value: "+81" },
  { label: "South Korea (+82)", value: "+82" },
  { label: "Netherlands (+31)", value: "+31" },
  { label: "Sweden (+46)", value: "+46" },
  { label: "Switzerland (+41)", value: "+41" },
  { label: "New Zealand (+64)", value: "+64" },
  { label: "South Africa (+27)", value: "+27" },
  { label: "Nigeria (+234)", value: "+234" },
  { label: "Bangladesh (+880)", value: "+880" },
  { label: "Pakistan (+92)", value: "+92" },
  { label: "Nepal (+977)", value: "+977" },
  { label: "Sri Lanka (+94)", value: "+94" },
  { label: "Malaysia (+60)", value: "+60" },
  { label: "Thailand (+66)", value: "+66" },
  { label: "Indonesia (+62)", value: "+62" },
  { label: "Philippines (+63)", value: "+63" },
  { label: "Vietnam (+84)", value: "+84" },
  { label: "Egypt (+20)", value: "+20" },
  { label: "Turkey (+90)", value: "+90" },
  { label: "Brazil (+55)", value: "+55" },
  { label: "Mexico (+52)", value: "+52" },
  { label: "Argentina (+54)", value: "+54" },
  { label: "Chile (+56)", value: "+56" },
  { label: "Spain (+34)", value: "+34" },
  { label: "Italy (+39)", value: "+39" },
  { label: "Poland (+48)", value: "+48" },
  { label: "Romania (+40)", value: "+40" },
  { label: "Greece (+30)", value: "+30" },
  { label: "Portugal (+351)", value: "+351" },
  { label: "Ireland (+353)", value: "+353" },
  { label: "Austria (+43)", value: "+43" },
  { label: "Denmark (+45)", value: "+45" },
  { label: "Finland (+358)", value: "+358" },
  { label: "Norway (+47)", value: "+47" },
  { label: "Belgium (+32)", value: "+32" },
  { label: "Hungary (+36)", value: "+36" },
  { label: "Czech Republic (+420)", value: "+420" },
  { label: "Slovakia (+421)", value: "+421" },
  { label: "Israel (+972)", value: "+972" },
  { label: "Ghana (+233)", value: "+233" },
  { label: "Kenya (+254)", value: "+254" },
  { label: "Morocco (+212)", value: "+212" },
  { label: "Algeria (+213)", value: "+213" },
];
const branchLabelOverrides = {
  cse: "CSE – Computer Science and Engineering",
  ece: "ECE – Electronics and Communication Engineering",
  eee: "EEE – Electrical and Electronics Engineering",
  me: "ME – Mechanical Engineering",
  ce: "CE – Civil Engineering",
  it: "IT – Information Technology",
  eie: "EIE – Electronics and Instrumentation Engineering",
  ae: "AE – Automobile Engineering",
  aiml: "CSE (AI & ML) – Computer Science and Engineering (Artificial Intelligence and Machine Learning)",
  cseds: "CSE (DS) – Computer Science and Engineering (Data Science)",
  csecys: "CSE (CyS) – Computer Science and Engineering (Cyber Security)",
  cseiot: "CSE (IoT) – Computer Science and Engineering (Internet of Things)",
  csbs: "CSBS – Computer Science and Business Systems",
  aids: "AI & DS – Artificial Intelligence and Data Science",
  vlsi: "VLSI",
  biotechnology: "Biotechnology",
  roboticsandai: "Robotics and AI",
};
const fallbackCatalog = {
  programs: [
    {
      code: "BTECH",
      label: "B.Tech",
      branches: [
        { code: "aids", label: branchLabelOverrides.aids },
        { code: "ae", label: branchLabelOverrides.ae },
        { code: "ce", label: branchLabelOverrides.ce },
        { code: "csbs", label: branchLabelOverrides.csbs },
        { code: "cse", label: branchLabelOverrides.cse },
        { code: "aiml", label: branchLabelOverrides.aiml },
        { code: "cseds", label: branchLabelOverrides.cseds },
        { code: "csecys", label: branchLabelOverrides.csecys },
        { code: "cseiot", label: branchLabelOverrides.cseiot },
        { code: "eee", label: branchLabelOverrides.eee },
        { code: "ece", label: branchLabelOverrides.ece },
        { code: "eie", label: branchLabelOverrides.eie },
        { code: "it", label: branchLabelOverrides.it },
        { code: "me", label: branchLabelOverrides.me },
        { code: "vlsi", label: branchLabelOverrides.vlsi },
        { code: "biotechnology", label: branchLabelOverrides.biotechnology },
        { code: "roboticsandai", label: branchLabelOverrides.roboticsandai },
      ],
    },
    {
      code: "MTECH",
      label: "M.Tech",
      branches: [
        { code: "cse", label: branchLabelOverrides.cse },
        { code: "ece", label: branchLabelOverrides.ece },
        { code: "eee", label: branchLabelOverrides.eee },
        { code: "me", label: branchLabelOverrides.me },
        { code: "vlsi", label: branchLabelOverrides.vlsi },
      ],
    },
  ],
};

const initialForm = {
  student_name: "",
  father_name: "",
  mother_name: "",
  date_of_birth: "",
  gender: "M",
  aadhaar_card_number: "",
  nationality: "",
  religion: "",
  eapcet_ht_no: "",
  eapcet_rank: "",
  pgcet_ht_no: "",
  pgcet_rank: "",
  jee_ht_no: "",
  jee_mains_rank: "",
  mother_tongue: "",
  student_phone_country: "+91",
  student_phone: "",
  father_phone_country: "+91",
  father_phone: "",
  mother_phone_country: "+91",
  mother_phone: "",
  student_email: "",
  father_email: "",
  mother_email: "",
  father_profession_and_designation: "Public Sector",
  father_organization: "",
  mother_profession_and_designation: "Public Sector",
  mother_organization: "",
  primary_contact_person: "Father",
  address_dno: "",
  address_apartment_name_block_house_name: "",
  address_street: "",
  address_village_town: "",
  address_mandal: "",
  address_district: "",
  address_state: "",
  address_pincode: "",
  rural_urban: "Rural",
  ews_status: "No",
  category_name: "OC",
  caste_as_per_tc: "",
  ebc_status: "No",
  income: "Below 2.5 lakhs",
  minority: "No",
  minority_type: "None",
  blood_group: "O +",
  ph_status: "No",
  ph_type: "None",
  scribe: "No",
  tenth_board_name: "TG BSE",
  tenth_studied_area_pincode: "",
  twelfth_board_name: "TG BIE",
  twelfth_studied_area_pincode: "",
  twelfth_or_diploma_specialization: "",
  program_level: "BTECH",
  branch_code: "cse",
  degree_code: "cse",
  admission_category: "Convenor",
};

const initialFiles = {
  tenth_memo: null,
  twelfth_memo: null,
  aadhaar: null,
  candidate_pic: null,
  entrance_hallticket: null,
  transfer_certificate: null,
  eapcet_rank_card: null,
  pgcet_rank_card: null,
  jee_rank_card: null,
};

const requiredDocTypes = ["tenth_memo", "twelfth_memo", "aadhaar", "transfer_certificate"];

const StudentPortal = () => {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState(initialForm);
  const [files, setFiles] = useState(initialFiles);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] = useState(null);
  const [catalog, setCatalog] = useState(fallbackCatalog);
  const { isAuthenticated, role } = useAuth();

  const availableBranches = useMemo(() => {
    const selectedProgram = catalog.programs.find(
      (p) => p.code === String(form.program_level || "").toUpperCase()
    );
    return selectedProgram?.branches || [];
  }, [catalog, form.program_level]);

  const branchOptions = useMemo(
    () =>
      availableBranches.map((branch) => ({
        value: branch.code,
        label: branchLabelOverrides[String(branch.code || "").toLowerCase()] || branch.label || branch.code,
      })),
    [availableBranches]
  );

  const minorityTypeOptionsFiltered = useMemo(() => {
    if (form.minority === "No") {
      return ["None"];
    }
    return minorityTypeOptions;
  }, [form.minority]);

  const phTypeOptionsFiltered = useMemo(() => {
    if (form.ph_status === "No") {
      return ["None"];
    }
    return phTypeOptions;
  }, [form.ph_status]);

  useEffect(() => {
    let mounted = true;
    API.get("/meta/programs-branches")
      .then((res) => {
        if (!mounted) return;
        if (res?.data?.programs?.length) {
          setCatalog(res.data);
        }
      })
      .catch(() => setCatalog(fallbackCatalog));
    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    const currentBranch = String(form.branch_code || "").toLowerCase();
    const validBranches = availableBranches.map((b) => String(b.code || "").toLowerCase());
    if (validBranches.length && !validBranches.includes(currentBranch)) {
      const nextBranch = validBranches.includes("cse") ? "cse" : validBranches[0];
      setForm((prev) => ({ ...prev, branch_code: nextBranch, degree_code: nextBranch }));
    }
  }, [availableBranches, form.branch_code]);

  const stepTitle = useMemo(() => {
    if (step === 1) return "Personal Details";
    if (step === 2) return "Address and Contact Details";
    return "Upload Certificates";
  }, [step]);

  const documentList = useMemo(() => {
    const baseDocs = [
      ["Passport Size Photo (for ID card)", "candidate_pic"],
      ["10th/SSC Memo *", "tenth_memo"],
      ["12th/Diploma Memo *", "twelfth_memo"],
      ["Aadhaar Card *", "aadhaar"],
      ["Transfer Certificate / Bonafide *", "transfer_certificate"],
    ];

    if (form.program_level === "BTECH") {
      return [
        ...baseDocs,
        ["EAPCET Hallticket", "entrance_hallticket"],
        ["EAPCET Rank Card", "eapcet_rank_card"],
        ["JEE Rank Card / GATE", "jee_rank_card"],
      ];
    } else if (form.program_level === "MTECH") {
      return [
        ...baseDocs,
        ["PGCET Hallticket", "entrance_hallticket"],
        ["PGCET Rank Card", "pgcet_rank_card"],
        ["JEE Rank Card / GATE", "jee_rank_card"],
      ];
    } else {
      return [
        ...baseDocs,
        ["EAPCET/ECET/PGCET/TGICET Hallticket", "entrance_hallticket"],
        ["EAPCET Rank Card / ECET / PGCET / TGICET", "eapcet_rank_card"],
        ["JEE Rank Card / GATE", "jee_rank_card"],
      ];
    }
  }, [form.program_level]);

  const updateField = (field, value) => {
    setForm((prev) => {
      if (field === "branch_code") {
        const normalized = String(value || "").toLowerCase();
        return { ...prev, branch_code: normalized, degree_code: normalized };
      }
      if (field === "program_level") {
        return { ...prev, program_level: String(value || "").toUpperCase() };
      }
      if (field === "minority") {
        return { ...prev, minority: value, minority_type: value === "No" ? "None" : prev.minority_type };
      }
      if (field === "ph_status") {
        return { ...prev, ph_status: value, ph_type: value === "No" ? "None" : prev.ph_type };
      }
      return { ...prev, [field]: value };
    });
  };

  const validateStep = () => {
    setError("");

    const isValidDob = (value) => /^\d{2}\/\d{2}\/\d{4}$/.test(String(value || "").trim());
    const isValidPhoneCountry = (value) => /^\+[1-9]\d{0,3}$/.test(String(value || "").trim());
    const isValidPhoneNumber = (value) => /^\d{6,15}$/.test(String(value || "").trim());
    const isValidRank = (value) => /^\d+$/.test(String(value || "").trim());
    const isValidPincode = (value) => !String(value || "").trim() || /^\d{6}$/.test(String(value || "").trim());

    if (step === 1) {
      const required = [
        "aadhaar_card_number",
        "student_name",
        "father_name",
        "mother_name",
        "date_of_birth",
        "gender",
        "mother_tongue",
        "nationality",
        "religion",
        "program_level",
        "branch_code",
      ];
      // for (const field of required) {
      //   if (!String(form[field] || "").trim()) {
      //     setError(`Please fill ${field.replace(/_/g, " ")}`);
      //     return false;
      //   }
      // }
      const aadhaar = String(form.aadhaar_card_number || "").replace(/\D/g, "");
      if (aadhaar.length !== 12) {
        setError("Aadhaar number must be 12 digits");
        return false;
      }
      if (!isValidDob(form.date_of_birth)) {
        setError("Date of Birth must be in DD/MM/YYYY format");
        return false;
      }
      if (!["M", "F", "T"].includes(String(form.gender || "").trim().toUpperCase())) {
        setError("Gender must be M, F, or T");
        return false;
      }
      if (form.program_level === "BTECH") {
        if (!form.eapcet_ht_no || !form.eapcet_rank) {
          setError("Please fill EAPCET Hall Ticket No. and EAPCET Rank");
          return false;
        }
        if (!isValidRank(form.eapcet_rank)) {
          setError("EAPCET Rank must be numeric");
          return false;
        }
      } else if (form.program_level === "MTECH") {
        if (!form.pgcet_ht_no || !form.pgcet_rank) {
          setError("Please fill PGCET Hall Ticket No. and PGCET Rank");
          return false;
        }
        if (!isValidRank(form.pgcet_rank)) {
          setError("PGCET Rank must be numeric");
          return false;
        }
      }

      if (!form.jee_mains_rank) {
        setError("Please fill JEE CRL Rank");
        return false;
      }
      if (!isValidRank(form.jee_mains_rank)) {
        setError("JEE CRL Rank must be numeric");
        return false;
      }
    }

    if (step === 2) {
      const required = [
        "student_phone",
        "father_phone",
        "mother_phone",
        "student_email",
        "father_profession_and_designation",
        "father_organization",
        "mother_profession_and_designation",
        "mother_organization",
        "primary_contact_person",
        "address_dno",
        "address_apartment_name_block_house_name",
        "address_street",
        "address_village_town",
        "address_mandal",
        "address_district",
        "address_state",
        "category_name",
        "income",
        "blood_group",
        "ph_status",
        "tenth_board_name",
        "twelfth_board_name",
        "twelfth_or_diploma_specialization",
      ];
      for (const field of required) {
        if (!String(form[field] || "").trim()) {
          setError(`Please fill ${field.replace(/_/g, " ")}`);
          return false;
        }
      }

      if (!isValidPhoneCountry(form.student_phone_country)) {
        setError("Please select a valid country code for student phone number");
        return false;
      }
      if (!isValidPhoneNumber(form.student_phone)) {
        setError("Student phone number must contain 6 to 15 digits");
        return false;
      }
      if (!isValidPhoneCountry(form.father_phone_country)) {
        setError("Please select a valid country code for father phone number");
        return false;
      }
      if (!isValidPhoneNumber(form.father_phone)) {
        setError("Father phone number must contain 6 to 15 digits");
        return false;
      }
      if (!isValidPhoneCountry(form.mother_phone_country)) {
        setError("Please select a valid country code for mother phone number");
        return false;
      }
      if (!isValidPhoneNumber(form.mother_phone)) {
        setError("Mother phone number must contain 6 to 15 digits");
        return false;
      }

      if (!isValidPincode(form.address_pincode)) {
        setError("Pincode must be either blank or exactly 6 digits");
        return false;
      }
      if (!isValidPincode(form.tenth_studied_area_pincode)) {
        setError("10th studied area pincode must be blank or exactly 6 digits");
        return false;
      }
      if (!isValidPincode(form.twelfth_studied_area_pincode)) {
        setError("12th studied area pincode must be blank or exactly 6 digits");
        return false;
      }
    }

    if (step === 3) {
      for (const docType of requiredDocTypes) {
        if (!files[docType]) {
          setError(`Please upload required document: ${docType.replace(/_/g, " ")}`);
          return false;
        }
      }
    }

    return true;
  };

  const nextStep = () => {
    if (!validateStep()) return;
    setStep((prev) => Math.min(prev + 1, 3));
  };

  const prevStep = () => {
    setError("");
    setStep((prev) => Math.max(prev - 1, 1));
  };

  const handleFileChange = (docType, file) => {
    setFiles((prev) => ({ ...prev, [docType]: file || null }));
  };

  const submitApplication = async () => {
    if (!validateStep()) return;

    setIsSubmitting(true);
    setError("");

    try {
      const payload = {
        ...form,
        aadhaar_card_number: String(form.aadhaar_card_number || "").replace(/\D/g, ""),
        student_phone: `${String(form.student_phone_country || "").trim()}${String(form.student_phone || "").replace(/\D/g, "")}`,
        father_phone: `${String(form.father_phone_country || "").trim()}${String(form.father_phone || "").replace(/\D/g, "")}`,
        mother_phone: `${String(form.mother_phone_country || "").trim()}${String(form.mother_phone || "").replace(/\D/g, "")}`,
        branch_code: String(form.branch_code || "").toLowerCase(),
        degree_code: String(form.degree_code || form.branch_code || "").toLowerCase(),
        program_level: String(form.program_level || "BTECH").toUpperCase(),
      };

      const response = await API.post("/applications", payload);
      const studentId = response?.data?.student_id;
      const applicationReference = response?.data?.application_reference;

      if (!studentId) {
        throw new Error("Application submitted but no student ID returned");
      }

      const docUploadOrder = [
        "tenth_memo",
        "twelfth_memo",
        "aadhaar",
        "candidate_pic",
        "entrance_hallticket",
        "transfer_certificate",
        "eapcet_rank_card",
        "pgcet_rank_card",
        "jee_rank_card",
      ];

      for (const docType of docUploadOrder) {
        const file = files[docType];
        if (!file) continue;

        const formData = new FormData();
        formData.append("file", file);
        await API.post(`/applications/${studentId}/documents/${docType}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }

      setResult({ studentId, applicationReference });
      setStep(1);
      setForm(initialForm);
      setFiles(initialFiles);
    } catch (err) {
      if ([401, 403].includes(err?.response?.status)) {
        setError("Please sign in with your student account to submit applications.");
      } else {
        setError(err?.response?.data?.detail || err?.message || "Failed to submit application");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderInput = (label, field, type = "text", placeholder = "") => (
    <label className="block">
      <span className="mb-1 block text-sm font-medium text-gray-700">{label}</span>
      <input
        type={type}
        value={form[field] || ""}
        onChange={(e) => updateField(field, e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
      />
    </label>
  );

  const renderPhoneField = (label, countryField, phoneField) => (
    <label className="block">
      <span className="mb-1 block text-sm font-medium text-gray-700">{label}</span>
      <div className="flex flex-col gap-2 sm:flex-row">
        <select
          value={form[countryField] || ""}
          onChange={(e) => updateField(countryField, e.target.value)}
          className="min-w-[120px] max-w-[160px] rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
        >
          {phoneCountryOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <input
          type="tel"
          value={form[phoneField] || ""}
          onChange={(e) => updateField(phoneField, e.target.value.replace(/\D/g, ""))}
          placeholder="9999999999"
          className="flex-1 min-w-0 rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
        />
      </div>
    </label>
  );

  const renderSelect = (label, field, options) => (
    <label className="block">
      <span className="mb-1 block text-sm font-medium text-gray-700">{label}</span>
      <select
        value={form[field] || ""}
        onChange={(e) => updateField(field, e.target.value)}
        className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
      >
        {options.map((opt) => {
          const option =
            typeof opt === "string"
              ? { value: opt, label: opt }
              : {
                  value: opt.value ?? opt.code ?? opt.label,
                  label: opt.label ?? opt.value ?? opt.code,
                };
          return (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
          );
        })}
      </select>
    </label>
  );

  const renderDobPicker = () => {
    const toIso = (dmy) => {
      const m = String(dmy || "").trim().match(/^(\d{2})\/(\d{2})\/(\d{4})$/);
      if (!m) return "";
      const [, dd, mm, yyyy] = m;
      return `${yyyy}-${mm}-${dd}`;
    };

    return (
      <label className="block">
        <span className="mb-1 block text-sm font-medium text-gray-700">Date of Birth (DD/MM/YYYY) *</span>
        <div className="relative">
          <input
            type="text"
            value={form.date_of_birth || ""}
            onChange={(e) => updateField("date_of_birth", e.target.value)}
            placeholder="DD/MM/YYYY"
            className="w-full rounded-md border border-gray-300 px-3 py-2 pr-10 focus:border-blue-500 focus:outline-none"
          />
          <div className="absolute right-2 top-1/2 -translate-y-1/2">
            <input
              type="date"
              value={toIso(form.date_of_birth)}
              onChange={(e) => {
                const isoDate = e.target.value; // yyyy-mm-dd
                if (!isoDate) {
                  updateField("date_of_birth", "");
                  return;
                }
                const [yyyy, mm, dd] = isoDate.split("-");
                updateField("date_of_birth", `${dd}/${mm}/${yyyy}`);
              }}
              className="absolute inset-0 h-6 w-6 cursor-pointer opacity-0"
            />
            <svg
              className="h-5 w-5 text-gray-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </div>
        </div>
      </label>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white px-4 py-8">
      <div className="mx-auto max-w-5xl rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <h1 className="text-2xl font-bold text-gray-900">Student Admissions Portal</h1>
        <p className="mt-1 text-sm text-gray-600">
          Multi-step admissions form for all programs (local-first storage).
        </p>
        {(!isAuthenticated || role !== "student") && (
          <p className="mt-2 text-sm text-amber-700">
            Sign in with a student account before final submission.
          </p>
        )}

        <div className="mt-6 grid grid-cols-3 gap-2 text-sm">
          {[1, 2, 3].map((n) => (
            <div
              key={n}
              className={`rounded-md px-3 py-2 text-center font-medium ${
                step >= n ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-600"
              }`}
            >
              Step {n}
            </div>
          ))}
        </div>

        <h2 className="mt-6 text-lg font-semibold text-gray-900">{stepTitle}</h2>

        {error && (
          <div className="mt-4 rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
            {error}
          </div>
        )}

        {result && (
          <div className="mt-4 rounded-md border border-green-200 bg-green-50 px-3 py-2 text-sm text-green-800">
            Application submitted successfully. Reference: <strong>{result.applicationReference}</strong>, Student ID:{" "}
            <strong>{result.studentId}</strong>
          </div>
        )}

        {step === 1 && (
          <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
            {renderInput("Aadhaar Card Number *", "aadhaar_card_number")}
            {renderInput("Name of the Student(As per SSC) *", "student_name")}
            {renderInput("Father's Name *", "father_name")}
            {renderInput("Mother's Name *", "mother_name")}
            {renderDobPicker()}
            {renderSelect("Gender *", "gender", ["Female", "Male", "Transgender"]) }
            {renderInput("Nationality *", "nationality")}
            {renderInput("Religion *", "religion")}
            {renderSelect("Program *", "program_level", programOptions)}
            {renderSelect("Branch *", "branch_code", branchOptions)}
            {form.program_level === "BTECH" && renderInput("EAPCET Hall Ticket No. *", "eapcet_ht_no")}
            {form.program_level === "BTECH" && renderInput("EAPCET Rank *", "eapcet_rank")}
            {form.program_level === "MTECH" && renderInput("PGCET Hall Ticket No. *", "pgcet_ht_no")}
            {form.program_level === "MTECH" && renderInput("PGCET Rank *", "pgcet_rank")}
            {renderInput("JEE Hall Ticket No. *", "jee_ht_no")}
            {renderInput("JEE CRL Rank *", "jee_mains_rank")}
            {renderInput("Mother Tongue *", "mother_tongue")}
          </div>
        )}

        {step === 2 && (
          <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
            {renderPhoneField("Student Phone Number *", "student_phone_country", "student_phone")}
            {renderPhoneField("Father Phone Number *", "father_phone_country", "father_phone")}
            {renderPhoneField("Mother Phone Number *", "mother_phone_country", "mother_phone")}
            {renderInput("Student Email *", "student_email", "email")}
            {renderInput("Father Email", "father_email", "email")}
            {renderInput("Mother Email", "mother_email", "email")}
            {renderSelect("Father Profession *", "father_profession_and_designation", professionOptions)}
            {renderInput("Father Designation / Organization *", "father_organization")}
            {renderSelect("Mother Profession *", "mother_profession_and_designation", professionOptions)}
            {renderInput("Mother Designation / Organization *", "mother_organization")}
            {renderSelect("Primary Contact Person *", "primary_contact_person", ["Father", "Mother"]) }

            <div className="md:col-span-2 mt-2">
              <h3 className="text-base font-semibold text-gray-900">Address for Communication</h3>
            </div>

            {renderInput("Door No./Flat No. *", "address_dno")}
            {renderInput("Apartment Name & Block / House Name *", "address_apartment_name_block_house_name")}
            {renderInput("Street Name *", "address_street")}
            {renderInput("Village / Town Name *", "address_village_town")}
            {renderInput("Mandal Name *", "address_mandal")}
            {renderInput("District Name *", "address_district")}
            {renderInput("State Name *", "address_state")}
            {renderInput("Pincode *", "address_pincode")}
            {renderSelect("Rural / Urban *", "rural_urban", ["Rural", "Urban"]) }

            <div className="md:col-span-2 mt-2">
              <h3 className="text-base font-semibold text-gray-900">Other Details</h3>
            </div>

            {renderSelect("Caste Category *", "category_name", casteOptions)}
            {renderInput("Caste as per previous TC", "caste_as_per_tc")}
            {renderSelect("Annual Income of Parent *", "income", incomeOptions)}
            {renderSelect("Minority *", "minority", ["Yes", "No"]) }
            {renderSelect("Minority Type", "minority_type", minorityTypeOptionsFiltered)}
            {renderSelect("Blood Group *", "blood_group", bloodGroups)}
            {renderSelect("PH Status *", "ph_status", ["Yes", "No"]) }
            {renderSelect("PH Type", "ph_type", phTypeOptionsFiltered)}
            {renderSelect("PH Scribe *", "scribe", ["Yes", "No"]) }

            {renderSelect("10th/SSC Board *", "tenth_board_name", tenthBoardOptions)}
            {renderInput("10th Studied Area Pincode *", "tenth_studied_area_pincode")}
            {renderSelect("12th Board Name *", "twelfth_board_name", twelfthBoardOptions)}
            {renderInput("12th / Diploma Studied Area Pincode *", "twelfth_studied_area_pincode")}
            {renderInput("12th / Diploma Specialization *", "twelfth_or_diploma_specialization")}
          </div>
        )}

        {step === 3 && (
          <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
            {documentList.map(([label, docType]) => (
              <label key={docType} className="block rounded-md border border-gray-200 p-3">
                <span className="mb-2 block text-sm font-medium text-gray-700">{label}</span>
                <input
                  type="file"
                  accept=".pdf,image/*"
                  onChange={(e) => handleFileChange(docType, e.target.files?.[0] || null)}
                  className="w-full text-sm"
                />
              </label>
            ))}
            <p className="text-xs text-gray-500 md:col-span-2">
              Allowed file types: PDF/JPG/JPEG/PNG. Max size per file: 5MB.
            </p>
          </div>
        )}

        <div className="mt-6 flex items-center justify-between">
          <button
            onClick={prevStep}
            disabled={step === 1 || isSubmitting}
            className="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Previous
          </button>

          {step < 3 ? (
            <button
              onClick={nextStep}
              disabled={isSubmitting}
              className="rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Next
            </button>
          ) : (
            <button
              onClick={submitApplication}
              disabled={isSubmitting}
              className="rounded-md bg-green-600 px-4 py-2 text-sm font-semibold text-white hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-40"
            >
              {isSubmitting ? "Submitting..." : "Submit Application"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentPortal;
