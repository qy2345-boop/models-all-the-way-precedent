const archiveCover = document.getElementById("archiveCover");
const enterArchive = document.getElementById("enterArchive");
const returnCover = document.getElementById("returnCover");
const app = document.getElementById("app");

const navTabs = [...document.querySelectorAll(".nav-tab")];
const pages = [...document.querySelectorAll(".page")];

enterArchive.addEventListener("click", () => {
  archiveCover.classList.add("is-hidden");
  app.classList.remove("is-hidden");
});

returnCover.addEventListener("click", () => {
  app.classList.add("is-hidden");
  archiveCover.classList.remove("is-hidden");
});

navTabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    const target = tab.dataset.target;

    navTabs.forEach((item) => item.classList.toggle("active", item === tab));
    pages.forEach((page) => page.classList.toggle("active", page.dataset.page === target));

    window.scrollTo({ top: 0, behavior: "smooth" });
    if (target === "system") {
      requestAnimationFrame(() => {
        resetDiagramView();
        selectNode("laion-5b");
      });
    }
  });
});

/* SYSTEM VIEWER */

const viewport = document.getElementById("diagramViewport");
const stage = document.getElementById("diagramStage");
const pipelineImage = document.getElementById("pipelineImage");
const modeLabel = document.getElementById("diagramModeLabel");
const processModeButton = document.getElementById("processMode");
const traceModeButton = document.getElementById("traceMode");
const detailPanel = document.getElementById("detailPanel");

let scale = 1;
let translateX = 0;
let translateY = 0;
let dragging = false;
let startX = 0;
let startY = 0;
let startTranslateX = 0;
let startTranslateY = 0;
let criticalMode = false;

function applyTransform() {
  stage.style.transform = `translate(${translateX}px, ${translateY}px) scale(${scale})`;
}

function resetDiagramView() {
  scale = 1;
  translateX = 0;
  translateY = 0;
  applyTransform();
}

document.getElementById("zoomIn").addEventListener("click", () => {
  scale = Math.min(4, scale + 0.1);
  applyTransform();
});

document.getElementById("zoomOut").addEventListener("click", () => {
  scale = Math.max(0.55, scale - 0.1);
  applyTransform();
});

document.getElementById("resetView").addEventListener("click", resetDiagramView);

const modeHotspots = {
  process: new Set([
    "web-pages",
    "common-crawl",
    "clip",
    "cld3",
    "laion-5b",
    "aesthetic-predictor"
  ]),
  trace: new Set([
    "web-pages",
    "clip",
    "cld3",
    "threshold-gate",
    "laion-5b",
    "aesthetic-predictor"
  ])
};

function setDiagramMode(mode) {
  criticalMode = mode === "trace";

  pipelineImage.src = criticalMode
    ? "assets/pipeline-trace.svg"
    : "assets/pipeline-process.svg";

  modeLabel.textContent = criticalMode ? "CRITICAL TRACE" : "PROCESS VIEW";
  detailPanel.classList.toggle("trace-mode", criticalMode);

  processModeButton.classList.toggle("active", !criticalMode);
  traceModeButton.classList.toggle("active", criticalMode);

  hotspots.forEach((hotspot) => {
    const enabled = modeHotspots[mode].has(hotspot.dataset.node);
    hotspot.disabled = !enabled;
    hotspot.classList.remove("active");
  });

  if (!selectNode("laion-5b")) clearNodePanels();
}

processModeButton.addEventListener("click", () => setDiagramMode("process"));
traceModeButton.addEventListener("click", () => setDiagramMode("trace"));

viewport.addEventListener("pointerdown", (event) => {
  if (event.target.closest(".hotspot")) return;

  dragging = true;
  viewport.classList.add("is-dragging");
  startX = event.clientX;
  startY = event.clientY;
  startTranslateX = translateX;
  startTranslateY = translateY;
  viewport.setPointerCapture(event.pointerId);
});

viewport.addEventListener("pointermove", (event) => {
  if (!dragging) return;
  translateX = startTranslateX + event.clientX - startX;
  translateY = startTranslateY + event.clientY - startY;
  applyTransform();
});

viewport.addEventListener("pointerup", (event) => {
  dragging = false;
  viewport.classList.remove("is-dragging");
  if (viewport.hasPointerCapture(event.pointerId)) {
    viewport.releasePointerCapture(event.pointerId);
  }
});

viewport.addEventListener("wheel", (event) => {
  event.preventDefault();
  const direction = event.deltaY < 0 ? 0.06 : -0.06;
  scale = Math.max(0.55, Math.min(4, scale + direction));
  applyTransform();
}, { passive: false });

/* NODE PLACEHOLDER DATA */

const nodeData = {
  "web-pages": {
    "title": "WEB PAGES",
    "source": "PROJECT ANALYSIS",
    "actor": "SOURCE PLATFORMS / WEB PUBLISHERS",
    "role": "Generate pages, images, captions, ALT text, and metadata.",
    "relations": "Content is published by users and platforms, then crawled by Common Crawl.",
    "consequence": "Platform and commercial priorities enter the dataset at the source."
  },
  "common-crawl": {
    "title": "COMMON CRAWL",
    "source": "COMMON CRAWL DOCUMENTATION",
    "actor": "COMMON CRAWL",
    "role": "Maintains an open archive of public web crawls.",
    "relations": "Receives public web content and supplies archived pages to downstream dataset builders.",
    "consequence": "Crawl coverage and collection frequency shape the available source corpus."
  },
  "clip": {
    "title": "CLIP",
    "source": "OPENAI DOCUMENTATION + PROJECT ANALYSIS",
    "actor": "OPENAI / CLIP",
    "role": "Measures semantic similarity between image and text embeddings.",
    "relations": "Receives candidate image-text pairs and sends similarity scores to the filtering stage.",
    "consequence": "Model-defined similarity becomes a condition of dataset inclusion."
  },
  "cld3": {
    "title": "CLD3",
    "source": "GOOGLE CLD3 + PROJECT ANALYSIS",
    "actor": "GOOGLE / CLD3",
    "role": "Predicts the language of caption text.",
    "relations": "Receives ALT text and supplies language labels used by LAION.",
    "consequence": "Classification errors can distort language subsets and filtering decisions."
  },
  "threshold-gate": {
    "title": "THRESHOLD GATE",
    "source": "LAION BENCHMARK + PROJECT ANALYSIS",
    "actor": "LAION BENCHMARK RULES",
    "role": "Defines language-specific minimum CLIP scores.",
    "relations": "Receives scores and labels, then determines whether pairs pass or fail.",
    "consequence": "Small parameter choices produce large changes at dataset scale."
  },
  "filter": {
    "title": "FILTER",
    "source": "PROJECT PIPELINE",
    "actor": "LAION FILTERING PIPELINE",
    "role": "Combines model outputs into inclusion and exclusion decisions.",
    "relations": "Receives CLIP scores, CLD3 labels, and threshold rules.",
    "consequence": "Multiple model judgments are consolidated into dataset membership."
  },
  "laion-5b": {
    "title": "LAION-5B",
    "source": "LAION DOCUMENTATION + EXTERNAL AUDIT",
    "actor": "LAION",
    "role": "Builds and distributes a large image-text dataset.",
    "relations": "Receives filtered image-text pairs and supplies datasets to downstream model developers.",
    "consequence": "Earlier infrastructure and filtering decisions propagate into AI training."
  },
  "aesthetic-predictor": {
    "title": "AESTHETIC PREDICTOR",
    "source": "MODEL DOCUMENTATION + PROJECT ANALYSIS",
    "actor": "LAION AESTHETIC MODEL / HUMAN RATERS",
    "role": "Learns to estimate perceived visual quality from human-rated images.",
    "relations": "Receives rated examples and assigns predicted scores to LAION images.",
    "consequence": "A limited preference sample becomes a scalable ranking system."
  },
  "aesthetic-score": {
    "title": "AESTHETIC SCORE",
    "source": "AESTHETIC MODEL DOCUMENTATION",
    "actor": "DOWNSTREAM MODEL DEVELOPERS",
    "role": "Use predicted scores to rank or filter images.",
    "relations": "Receives output from the predictor and acts on dataset subsets.",
    "consequence": "Subjective preference is operationalized as a numeric value."
  }
};

const processNodeData = {
  "web-pages": {
    "function": "Web pages supply the images and ALT text that later become candidate image–text pairs in LAION-5B.",
    "finding": "Platforms such as SlidePlayer, Pinterest, and Shopify generate especially large amounts of ALT-tagged content.",
    "claim": "ALT TEXT\nSEO\nCAPTIONS\nCOMMERCIAL LOGICS",
    "evidence": "assets/alt.png",
    "evidenceType": "image"
  },
  "common-crawl": {
    "function": "Common Crawl is an open web archive built by continuously crawling publicly accessible websites.",
    "finding": "It preserves webpage HTML, image URLs, ALT text, metadata, and extracted text that can later be processed into candidate image–text pairs.",
    "claim": "300B+ WEB PAGES\n3–5B ADDED MONTHLY\n10+ PETABYTES",
    "evidence": "assets/crawl-v1.png",
    "evidenceType": "image",
    "originalUrl": "https://commoncrawl.org/"
  },
  "clip": {
    "function": "CLIP is a vision–language model developed by OpenAI that measures semantic similarity between images and text.",
    "finding": "LAION used OpenAI’s CLIP ViT-B/32 model to score candidate image–text pairs extracted from Common Crawl and filter out weak matches.",
    "claim": "IMAGE → VECTOR\nTEXT → VECTOR\nSIMILARITY SCORE",
    "evidence": "assets/clip-v1.png",
    "evidenceType": "image",
    "originalUrl": "https://openai.com/index/clip/"
  },
  "cld3": {
    "function": "CLD3 is a neural language-identification model developed by Google that predicts the language of a piece of text.",
    "finding": "LAION uses CLD3 to classify each ALT text as English, another language, or no detected language, helping divide LAION-5B into language-based subsets.",
    "claim": "ALT TEXT → LANGUAGE PREDICTION\nLANGUAGE CODE\nPROBABILITY SCORE\nDATASET SPLITTING",
    "evidence": "assets/cld3-v1.png",
    "evidenceType": "image",
    "originalUrl": "https://github.com/google/cld3"
  },
  "laion-5b": {
    "function": "LAION-5B is an open dataset containing 5.85 billion image–text pairs collected from the web and filtered using CLIP.",
    "finding": "Its subsets have been used in systems including Stable Diffusion and Midjourney, despite LAION warning against using the dataset directly for production-ready commercial products.",
    "claim": "5.85B IMAGE–TEXT PAIRS\nIMAGE URLS + TEXT\nCLIP SCORES",
    "evidence": "assets/laion-v1.png",
    "evidenceType": "image",
    "originalUrl": "https://laion.ai/projects/"
  },
  "aesthetic-predictor": {
    "function": "Aesthetic Predictor V2 is a machine-learning model that estimates the perceived aesthetic quality of an image.",
    "finding": "It assigns predicted aesthetic scores to images in LAION-5B, enabling the creation of higher-scoring LAION-Aesthetics subsets.",
    "claim": "HUMAN-RATED TRAINING DATA\nIMAGE INPUT\nAESTHETIC SCORE",
    "evidence": "assets/pre-v1.png",
    "evidenceType": "image",
    "originalUrl": "https://github.com/christophschuhmann/improved-aesthetic-predictor"
  }
};

const traceNodeData = {
  "web-pages": {
    "function": "ALT text often reflects platform, marketing, and search-engine priorities rather than an accurate description of the image.",
    "finding": "SEO-DRIVEN DESCRIPTIONS\nPROMOTIONAL LANGUAGE\nPARTIAL IMAGE DESCRIPTION\nPLATFORM BIAS",
    "claim": "PLATFORM PRIORITIES SHAPE WHAT BECOMES DATA.",
    "evidence": "assets/alt-trace.png",
    "evidenceType": "image"
  },
  "clip": {
    "function": "CLIP’s training data was not publicly disclosed, making its similarity judgments difficult to examine. High similarity scores may also reflect repeated text embedded in an image rather than a meaningful description of visual content.",
    "finding": "UNDISCLOSED TRAINING DATA\nMODEL-DEFINED SIMILARITY\nTEXT MATCHING ≠ VISUAL UNDERSTANDING",
    "claim": "SIMILARITY IS MODEL-DEFINED, NOT NEUTRAL.",
    "evidence": "assets/sale.png",
    "evidenceType": "image",
    "originalUrl": "https://openai.com/index/clip/"
  },
  "cld3": {
    "function": "CLD3 incorrectly classified large numbers of English and other-language captions as Luxembourgish, distorting the language distribution of LAION-5B.",
    "finding": "LANGUAGE MISCLASSIFICATION\n34,270,773 CAPTIONS LABELED AS LUXEMBOURGISH",
    "claim": "LANGUAGE LABELS CAN DISTORT DATASET REPRESENTATION.",
    "evidence": "assets/cld3.png",
    "evidenceType": "image",
    "originalUrl": "https://github.com/google/cld3"
  },
  "threshold-gate": {
    "function": "LAION relies on manually selected CLIP similarity thresholds to determine which image–text pairs remain in the dataset. Because many pairs cluster near these cutoffs, a very small adjustment can radically change the dataset.",
    "finding": "16% OF PAIRS WITHIN 0.01 OF THE LOWER THRESHOLD\n+0.01 THRESHOLD\n−937,489,831 PAIRS",
    "claim": "SMALL THRESHOLD CHANGES BECOME MASSIVE EXCLUSIONS.",
    "evidence": "assets/threshold.png",
    "evidenceType": "image"
  },
  "laion-5b": {
    "function": "LAION-5B was found to contain links to suspected child sexual abuse material, revealing serious gaps in the safety review of web-scale datasets.",
    "finding": "3,226 SUSPECTED CSAM INSTANCES\nILLEGAL CONTENT\nINSUFFICIENT SAFETY REVIEW",
    "claim": "WEB-SCALE COLLECTION CAN OUTPACE SAFETY REVIEW.",
    "evidence": "assets/5b.png",
    "evidenceType": "image",
    "originalUrl": "https://stacks.stanford.edu/file/druid:kh752sm9123/ml_training_data_csam_report-2023-12-23.pdf"
  },
  "aesthetic-predictor": {
    "function": "Aesthetic Predictor V2 learns visual preference from a limited set of human ratings. These preferences are then applied at massive scale, allowing the tastes of a relatively small and demographically narrow group to shape which images are treated as aesthetically valuable.",
    "finding": "LIMITED HUMAN RATERS\nDEMOGRAPHICALLY NARROW TASTE\nSUBJECTIVE SCORES AS TRAINING DATA",
    "claim": "SUBJECTIVE PREFERENCES BECOME SCALABLE INFRASTRUCTURE.",
    "evidence": "assets/predictor.png",
    "evidenceType": "image",
    "originalUrl": "https://github.com/christophschuhmann/improved-aesthetic-predictor"
  }
};

function clearNodePanels() {
  detailTitle.textContent = criticalMode ? "SELECT A WARNING NODE" : "SELECT A COMPONENT";
  detailLabelOne.textContent = criticalMode ? "PROBLEM" : "OVERVIEW";
  detailLabelTwo.textContent = criticalMode ? "KEY POINTS" : "ROLE IN PIPELINE";
  detailLabelThree.textContent = criticalMode ? "THIS INDICATES" : "KEY DATA";
  detailFunction.textContent = criticalMode
    ? "Choose a highlighted component to inspect its critical consequence."
    : "Choose a component to review neutral background information.";
  detailFinding.textContent = "—";
  detailClaim.textContent = criticalMode ? "..." : "—";
  detailSource.textContent = "NO EVIDENCE SELECTED";
  openEvidenceButton.disabled = true;
  currentEvidence = null;
  actorContext.textContent = "NO NODE SELECTED";
  actorOrganization.textContent = "—";
  actorRole.textContent = "—";
  actorRelations.textContent = "—";
  actorConsequence.textContent = "—";
}

const detailTitle = document.getElementById("detailTitle");
const detailLabelOne = document.getElementById("detailLabelOne");
const detailLabelTwo = document.getElementById("detailLabelTwo");
const detailLabelThree = document.getElementById("detailLabelThree");
let currentEvidence = null;
const detailFunction = document.getElementById("detailFunction");
const detailFinding = document.getElementById("detailFinding");
const detailClaim = document.getElementById("detailClaim");
const detailSource = document.getElementById("detailSource");

const actorContext = document.getElementById("actorContext");
const actorOrganization = document.getElementById("actorOrganization");
const actorRole = document.getElementById("actorRole");
const actorRelations = document.getElementById("actorRelations");
const actorConsequence = document.getElementById("actorConsequence");

const hotspots = [...document.querySelectorAll(".hotspot")];

function selectNode(id) {
  const hotspot = hotspots.find((item) => item.dataset.node === id && !item.disabled);
  const base = nodeData[id];
  const modeData = criticalMode ? traceNodeData[id] : processNodeData[id];
  if (!hotspot || !base || !modeData) return false;

  hotspots.forEach((item) => item.classList.toggle("active", item === hotspot));

  detailTitle.textContent = base.title;
  detailLabelOne.textContent = criticalMode ? "PROBLEM" : "OVERVIEW";
  detailLabelTwo.textContent = criticalMode ? "KEY POINTS" : "ROLE IN PIPELINE";
  detailLabelThree.textContent = criticalMode ? "THIS INDICATES" : "KEY DATA";
  detailFunction.textContent = modeData.function;
  detailFinding.textContent = modeData.finding;
  detailClaim.textContent = modeData.claim;
  detailSource.textContent = base.source;
  currentEvidence = modeData;
  openEvidenceButton.disabled = !modeData.evidence;

  actorContext.textContent = base.title;
  actorOrganization.textContent = base.actor;
  actorRole.textContent = base.role;
  actorRelations.textContent = base.relations;
  actorConsequence.textContent = base.consequence;
  return true;
}

hotspots.forEach((hotspot) => {
  hotspot.addEventListener("click", (event) => {
    event.stopPropagation();
    selectNode(hotspot.dataset.node);
  });
});


const evidenceModal = document.getElementById("evidenceModal");
const openEvidenceButton = document.getElementById("openEvidence");
const closeEvidenceButton = document.getElementById("closeEvidence");
const evidenceTitle = document.getElementById("evidenceTitle");
const evidenceMedia = document.getElementById("evidenceMedia");
const evidenceOriginal = document.getElementById("evidenceOriginal");

function openEvidenceModal() {
  if (!currentEvidence || !currentEvidence.evidence) return;
  evidenceTitle.textContent = detailTitle.textContent;
  evidenceMedia.innerHTML = "";
  evidenceMedia.classList.remove("has-image");

  if (currentEvidence.evidenceType === "image") {
    const image = document.createElement("img");
    image.src = currentEvidence.evidence;
    image.alt = `${detailTitle.textContent} evidence`;
    evidenceMedia.appendChild(image);
    evidenceMedia.classList.add("has-image");
  }

  if (currentEvidence.originalUrl) {
    evidenceOriginal.href = currentEvidence.originalUrl;
    evidenceOriginal.hidden = false;
  } else {
    evidenceOriginal.removeAttribute("href");
    evidenceOriginal.hidden = true;
  }

  evidenceModal.classList.add("open");
  evidenceModal.setAttribute("aria-hidden", "false");
}

function closeEvidenceModal() {
  evidenceModal.classList.remove("open");
  evidenceModal.setAttribute("aria-hidden", "true");
}

openEvidenceButton.addEventListener("click", openEvidenceModal);
closeEvidenceButton.addEventListener("click", closeEvidenceModal);

document.querySelectorAll("[data-close-evidence]").forEach((item) => {
  item.addEventListener("click", closeEvidenceModal);
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeEvidenceModal();
});


const evidenceWindow = evidenceModal.querySelector(".evidence-window");
const evidenceHandle = document.getElementById("evidenceHandle");

let evidenceDragging = false;
let evidenceStartX = 0;
let evidenceStartY = 0;
let evidenceStartLeft = 0;
let evidenceStartTop = 0;

function placeEvidenceCard() {
  const navWidth = parseFloat(
    getComputedStyle(document.documentElement).getPropertyValue("--nav-width")
  ) || 184;

  const cardWidth = evidenceWindow.offsetWidth || 520;
  evidenceWindow.style.left = `${Math.max(18, window.innerWidth - navWidth - cardWidth - 28)}px`;
  evidenceWindow.style.top = "118px";
  evidenceWindow.style.right = "auto";
}

evidenceHandle.addEventListener("pointerdown", (event) => {
  if (event.target.closest("button")) return;

  evidenceDragging = true;
  evidenceStartX = event.clientX;
  evidenceStartY = event.clientY;
  evidenceStartLeft = evidenceWindow.offsetLeft;
  evidenceStartTop = evidenceWindow.offsetTop;
  evidenceHandle.setPointerCapture(event.pointerId);
  event.preventDefault();
});

evidenceHandle.addEventListener("pointermove", (event) => {
  if (!evidenceDragging) return;

  const nextLeft = evidenceStartLeft + event.clientX - evidenceStartX;
  const nextTop = evidenceStartTop + event.clientY - evidenceStartY;
  const maxLeft = window.innerWidth - evidenceWindow.offsetWidth - 12;
  const maxTop = window.innerHeight - evidenceWindow.offsetHeight - 12;

  evidenceWindow.style.left = `${Math.max(12, Math.min(nextLeft, maxLeft))}px`;
  evidenceWindow.style.top = `${Math.max(12, Math.min(nextTop, maxTop))}px`;
});

evidenceHandle.addEventListener("pointerup", (event) => {
  evidenceDragging = false;
  if (evidenceHandle.hasPointerCapture(event.pointerId)) {
    evidenceHandle.releasePointerCapture(event.pointerId);
  }
});

window.addEventListener("resize", () => {
  if (evidenceModal.classList.contains("open")) placeEvidenceCard();
});

const openEvidenceModalBase = openEvidenceModal;
openEvidenceModal = function () {
  openEvidenceModalBase();
  requestAnimationFrame(placeEvidenceCard);
};

setDiagramMode("process");


/* D3 RELATIONAL STRUCTURE */
(function initRelationCanvas() {
  const container = document.getElementById("relationGraph");
  const info = document.getElementById("relationInfo");
  const resetButton = document.getElementById("relationReset");
  if (!container || !info || !resetButton) return;

  if (typeof d3 === "undefined") {
    container.innerHTML = '<p style="padding:20px">D3 library could not load. Check the internet connection and refresh.</p>';
    return;
  }

  const categoryLabel = {
    actor: "ACTOR / ORGANIZATION",
    model: "MODEL / OPERATION",
    data: "DATASET / OUTPUT"
  };

  let graph = null;
  let svg = null;
  let rootGroup = null;
  let zoomBehavior = null;
  let selectedId = null;
  let currentWidth = 0;
  let currentHeight = 0;

  Promise.all([
    d3.csv("data/nodes.csv"),
    d3.csv("data/edges.csv")
  ]).then(([nodes, links]) => {
    nodes.forEach((node) => {
      node.width = Math.max(108, Math.min(170, node.label.length * 8 + 30));
      node.height = 42;
    });

    graph = { nodes, links };
    buildGraph();
  }).catch((error) => {
    console.error("Unable to load D3 relational data:", error);
    container.innerHTML = '<p style="padding:20px">RELATIONAL DATA COULD NOT LOAD. Run the site through a local server rather than opening index.html directly.</p>';
  });

  function buildGraph() {
    container.innerHTML = "";
    currentWidth = Math.max(720, container.clientWidth || 900);
    currentHeight = Math.max(520, container.clientHeight || 590);

    svg = d3.select(container)
      .append("svg")
      .attr("viewBox", `0 0 ${currentWidth} ${currentHeight}`)
      .attr("role", "img")
      .attr("aria-label", "Actor, model, and dataset relationship network");

    svg.append("defs")
      .append("marker")
      .attr("id", "relation-arrow")
      .attr("viewBox", "0 -5 10 10")
      .attr("refX", 8)
      .attr("refY", 0)
      .attr("markerWidth", 6)
      .attr("markerHeight", 6)
      .attr("orient", "auto")
      .append("path")
      .attr("d", "M0,-5L10,0L0,5")
      .attr("fill", "#777");

    rootGroup = svg.append("g");

    zoomBehavior = d3.zoom()
      .scaleExtent([0.55, 2.4])
      .on("zoom", (event) => rootGroup.attr("transform", event.transform));

    svg.call(zoomBehavior).on("dblclick.zoom", null);

    const columns = {
      actor: currentWidth * 0.18,
      model: currentWidth * 0.50,
      data: currentWidth * 0.82
    };

    [
      ["ACTORS / ORGANIZATIONS", columns.actor],
      ["MODELS / OPERATIONS", columns.model],
      ["DATASETS / OUTPUTS", columns.data]
    ].forEach(([label, x]) => {
      rootGroup.append("text")
        .attr("class", "relation-column-label")
        .attr("x", x)
        .attr("y", 28)
        .attr("text-anchor", "middle")
        .text(label);
    });

    const grouped = d3.group(graph.nodes, (d) => d.category);
    grouped.forEach((items, category) => {
      const gap = (currentHeight - 100) / Math.max(items.length, 1);
      items.forEach((node, index) => {
        node.x = columns[category];
        node.y = 70 + gap * (index + 0.5);
      });
    });

    const nodeById = new Map(graph.nodes.map((d) => [d.id, d]));
    graph.links.forEach((link) => {
      link.source = nodeById.get(typeof link.source === "string" ? link.source : link.source.id);
      link.target = nodeById.get(typeof link.target === "string" ? link.target : link.target.id);
    });

    const links = rootGroup.append("g")
      .selectAll("path")
      .data(graph.links)
      .join("path")
      .attr("class", "relation-link")
      .attr("marker-end", "url(#relation-arrow)");

    const labels = rootGroup.append("g")
      .selectAll("text")
      .data(graph.links)
      .join("text")
      .attr("class", "relation-link-label")
      .attr("text-anchor", "middle")
      .text((d) => d.relation);

    const nodes = rootGroup.append("g")
      .selectAll("g")
      .data(graph.nodes)
      .join("g")
      .attr("class", "relation-node")
      .attr("data-category", (d) => d.category)
      .attr("tabindex", 0)
      .attr("role", "button")
      .attr("aria-label", (d) => `${d.label}, ${categoryLabel[d.category]}`)
      .on("click", (event, d) => {
        event.stopPropagation();
        selectRelationNode(d.id);
      })
      .on("keydown", (event, d) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          selectRelationNode(d.id);
        }
      })
      .call(d3.drag()
        .on("start", (event) => event.sourceEvent.stopPropagation())
        .on("drag", (event, d) => {
          d.x = event.x;
          d.y = event.y;
          updatePositions();
        }));

    nodes.append("rect")
      .attr("x", (d) => -d.width / 2)
      .attr("y", (d) => -d.height / 2)
      .attr("width", (d) => d.width)
      .attr("height", (d) => d.height)
      .attr("rx", 2);

    nodes.append("text")
      .attr("text-anchor", "middle")
      .attr("dominant-baseline", "middle")
      .text((d) => d.label);

    svg.on("click", () => selectRelationNode(null));

    function linkPath(d) {
      const sx = d.source.x + d.source.width / 2;
      const tx = d.target.x - d.target.width / 2;
      const mid = (sx + tx) / 2;
      return `M${sx},${d.source.y} C${mid},${d.source.y} ${mid},${d.target.y} ${tx},${d.target.y}`;
    }

    function updatePositions() {
      nodes.attr("transform", (d) => `translate(${d.x},${d.y})`);
      links.attr("d", linkPath);
      labels
        .attr("x", (d) => (d.source.x + d.target.x) / 2)
        .attr("y", (d) => (d.source.y + d.target.y) / 2 - 6);
    }

    function selectRelationNode(id) {
      selectedId = id;
      const connectedIds = new Set();
      if (id) {
        connectedIds.add(id);
        graph.links.forEach((link) => {
          if (link.source.id === id) connectedIds.add(link.target.id);
          if (link.target.id === id) connectedIds.add(link.source.id);
        });
      }

      nodes
        .classed("is-selected", (d) => d.id === id)
        .classed("is-muted", (d) => Boolean(id) && !connectedIds.has(d.id));

      links
        .classed("is-active", (d) => Boolean(id) && (d.source.id === id || d.target.id === id))
        .classed("is-muted", (d) => Boolean(id) && d.source.id !== id && d.target.id !== id);

      labels
        .classed("is-active", (d) => Boolean(id) && (d.source.id === id || d.target.id === id))
        .classed("is-muted", (d) => Boolean(id) && d.source.id !== id && d.target.id !== id);

      if (!id) {
        info.innerHTML = '<span>SELECT A NODE</span><h3>RELATION FILE</h3><p>Click a node to isolate its direct relationships. Drag nodes to adjust the composition; scroll to zoom and pan.</p>';
        return;
      }

      const node = nodeById.get(id);
      const outgoing = graph.links.filter((link) => link.source.id === id);
      const incoming = graph.links.filter((link) => link.target.id === id);
      const relationRows = [
        ...outgoing.map((link) => `${link.relation.toUpperCase()} → ${link.target.label}`),
        ...incoming.map((link) => `${link.source.label} → ${link.relation.toUpperCase()}`)
      ];

      info.innerHTML = `
        <span>${categoryLabel[node.category]}</span>
        <h3>${node.label}</h3>
        <p>${node.description}</p>
        <dl>
          <div><dt>ORGANIZATION</dt><dd>${node.organization}</dd></div>
          <div><dt>DIRECT RELATIONS</dt><dd>${relationRows.join("<br>") || "—"}</dd></div>
        </dl>`;
    }

    function resetGraph() {
      selectedId = null;
      grouped.forEach((items, category) => {
        const gap = (currentHeight - 100) / Math.max(items.length, 1);
        items.forEach((node, index) => {
          node.x = columns[category];
          node.y = 70 + gap * (index + 0.5);
        });
      });
      updatePositions();
      selectRelationNode(null);
      svg.transition().duration(350).call(zoomBehavior.transform, d3.zoomIdentity);
    }

    resetButton.onclick = resetGraph;
    updatePositions();
    selectRelationNode(null);
  }

  const resizeObserver = new ResizeObserver(() => {
    if (!graph || !container.offsetParent) return;
    const nextWidth = container.clientWidth;
    if (Math.abs(nextWidth - currentWidth) > 40) buildGraph();
  });
  resizeObserver.observe(container);
})();
function openD3FromHash() {
  if (window.location.hash !== "#d3") return;

  archiveCover.classList.add("is-hidden");
  app.classList.remove("is-hidden");

  const argumentsButton = document.querySelector(
    '[data-target="arguments"]'
  );

  if (argumentsButton) {
    argumentsButton.click();
  }

  window.setTimeout(() => {
    const d3Section = document.querySelector("#d3Section");

    if (d3Section) {
      d3Section.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    }
  }, 300);
}

openD3FromHash();

window.addEventListener("hashchange", openD3FromHash);