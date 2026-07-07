# Models All The Way Down: Precedent Research

## Information

### Title
*Models All The Way Down*

### Authors
Christo Buschek and Jer Thorp

### Year
2024

### Format
Web-based visual investigation

### Intended Audience
The project itself says that “artists, academics, practitioners, or journalists” need dataset investigation as a way to understand complex AI systems.

### What is the project about?
This project is a data visualization and visual storytelling project that makes an AI training dataset visible and understandable. Through the case of LAION-5B, it shows that AI models do not generate images from nothing. Rather, they are built on large collections of web images and text that have been scraped, filtered, labeled, and processed by other models.

---

## Author / Project Materials Bibliography

### 1. Buschek, Christo, and Jer Thorp — [*Models All The Way Down*](https://knowingmachines.org/models-all-the-way)

- **Type:** Primary project page
- **Year:** 2024
- **Notes:** This is the main project page by Christo Buschek and Jer Thorp. It presents the visual investigation of LAION-5B and explains how the dataset was constructed, filtered, and entangled with other models.

### 2. NYU Engelberg — [*models-all-the-way* GitHub Repository](https://github.com/NYUEngelberg/models-all-the-way)

- **Type:** Data repository
- **Year:** 2024
- **Notes:** This repository contains data assets produced during the investigation. The repository describes the project as an investigation by Knowing Machines and Der SPIEGEL into the LAION-5B dataset.

### 3. Christo Buschek — [*LAION-5B*](https://christobuschek.net/laion-5b/)

- **Type:** Author portfolio page
- **Year:** 2024
- **Notes:** Christo Buschek’s personal project page documents the LAION-5B investigation and connects it to his investigative journalism and data work.

### 4. Knowing Machines — [Research Page](https://knowingmachines.org/research)

- **Type:** Institutional project listing
- **Year:** 2024
- **Notes:** Knowing Machines lists *Models All The Way Down* as a “Visual Story” and describes it as an investigation following the construction of LAION-5B to understand its contents, implications, and entanglements.

---

## External Reception and Reviews Bibliography

These sources discuss *Models All The Way Down* directly. Most external responses I found are positive or descriptive rather than negative reviews.

### 1. Open Future — [“Seeing like an algorithm: A closer look at LAION 5B”](https://openfuture.eu/note/seeing-like-an-algorithm-a-closer-look-at-laion-5b/)

- **Type:** Policy commentary
- **Year:** 2024
- **Publisher:** Open Future
- **Notes:** Open Future frames the project as a visual investigation into how LAION-5B was constructed. It emphasizes dataset transparency and connects the project to broader debates about AI accountability and regulation.
- **Why it matters:** This source is useful because it translates the project into a policy context. It suggests that understanding datasets is necessary for understanding the social impact of generative AI systems.

### 2. dh+lib Review — [“POST: Models All The Way Down”](https://dhandlib.org/post-models-all-the-way-down/)

- **Type:** Review
- **Year:** 2026
- **Publisher:** dh+lib Review
- **Notes:** This review explains the project as a study of the relationship between a large AI model and its training data. It emphasizes concerns around harmful content, ethical dataset curation, and the need for transparency.
- **Why it matters:** This source is useful because it places the project in a digital humanities and library/information studies context, where questions of archives, metadata, curation, and access are central.

---

## Additional Context Sources

These sources are not direct reviews of *Models All The Way Down*, but they help explain the technical and ethical context of the project.

### 1. Schuhmann et al. — [“LAION-5B: An open large-scale dataset for training next generation image-text models”](https://arxiv.org/abs/2210.08402)

- **Type:** Academic paper
- **Year:** 2022
- **Authors:** Christoph Schuhmann et al.
- **Notes:** This is the original paper introducing LAION-5B as a dataset of 5.85 billion CLIP-filtered image-text pairs. It is important background because *Models All The Way Down* critically investigates the dataset described in this paper.

### 2. LAION — [“LAION-5B: A new era of open large-scale multi-modal datasets”](https://laion.ai/laion-5b-a-new-era-of-open-large-scale-multi-modal-datasets/)

- **Type:** Dataset announcement
- **Year:** 2022
- **Publisher:** LAION
- **Notes:** This announcement provides LAION's own framing of the dataset as an open large-scale multimodal training resource.

### 3. Dominguez-Catena, Paternain, and Galar — [“Unmasking LAION-5B: Age, Gender, Race, and Emotion Biases in Large-Scale Image Datasets”](https://arxiv.org/abs/2606.23204)

- **Type:** Academic paper
- **Year:** 2026
- **Notes:** This paper is useful as a recent example of continued scholarly analysis of LAION-5B's demographic and representational biases.



---

# Part 2: Argument Map and Critical Analysis

## Overview

*Models All The Way Down* is not only a project about what exists inside LAION-5B. It is also an argument about how AI training datasets are made. The project shows that datasets are not neutral containers of raw images. Instead, they are produced through web infrastructure, platform conventions, machine-learning models, statistical thresholds, language classifiers, aesthetic predictors, and safety metrics.

The authors’ central argument is that AI systems are shaped before training even begins. The dataset already contains layers of technical, cultural, political, and commercial decisions. By visually investigating LAION-5B, the project makes these hidden layers visible and shows how they influence what AI models can see, value, reproduce, and ignore.

---

## 1. Dataset Investigation as a Way to Understand AI

### Argument Chain

Large AI models require massive training datasets  
→ these datasets shape how models see and reproduce the world  
→ but datasets like LAION-5B are too large for humans to inspect directly  
→ therefore, dataset investigation becomes necessary for understanding AI systems.

### Authors’ Emphasis

The authors emphasize that a dataset is not just technical background. It is a foundational layer of AI infrastructure. If we only look at the final AI-generated image, we miss the systems of collection, filtering, labeling, and scoring that made that output possible.

The project shifts attention from AI outputs to AI inputs. It asks: before an image model generates anything, what kind of world has already been encoded into its training data?

### Larger Issues / Keywords

- Dataset transparency
- AI accountability
- Data infrastructure
- Training data as cultural evidence
- Harm before model training

---

## 2. Scale and the Limits of Human Curation

### Argument Chain

LAION-5B contains billions of image-text pairs  
→ human review at this scale is impossible  
→ curation shifts from human judgment to automated models, scores, and thresholds  
→ automated curation still makes decisions, but those decisions become harder to see.

### Authors’ Emphasis

The project argues that scale does not remove judgment. Instead, it relocates judgment into technical systems. When a dataset becomes too large to inspect manually, the act of deciding what belongs in the dataset is handled by models and statistical rules.

This is one of the key tensions in the project: large-scale AI requires large-scale data, but large-scale data also makes responsibility and oversight much more difficult.

### Larger Issues / Keywords

- Ethics of scale
- Algorithmic governance
- Automated curation
- Responsibility gap
- Statistical decision-making

---

## 3. Common Crawl, ALT Text, and Web Infrastructure

### Argument Chain

LAION-5B is built from Common Crawl  
→ Common Crawl captures the structure of the web  
→ LAION extracts image-text pairs from web pages  
→ the dataset reflects the web as crawled, structured, and made machine-readable.

### Authors’ Emphasis

The authors emphasize that LAION-5B is not a direct representation of the world. It is a representation of the web. More specifically, it is a representation of certain parts of the web that are easy for machines to crawl, parse, and classify.

This means that the dataset inherits the structure of web infrastructure. It is shaped by HTML tags, image captions, metadata conventions, search engine optimization, and platform-specific systems of visibility.

### Larger Issues / Keywords

- Data is constructed, not raw
- Web infrastructure
- Platform mediation
- Machine-readable culture
- Internet as training material

---

## 4. ALT Text and Platform Logic

### Argument Chain

Images are paired with ALT text  
→ ALT text was originally designed for accessibility  
→ but in many web contexts it is shaped by SEO, e-commerce, automatic tagging, and platform visibility  
→ therefore, captions in LAION-5B often reflect how platforms want images to be read by machines.

### Authors’ Emphasis

The authors show that image captions in LAION-5B are not simply neutral descriptions of images. ALT text can carry the logic of search engines, e-commerce platforms, and content optimization. For example, platforms like Pinterest and Shopify appear prominently in the dataset partly because their web structures produce many machine-readable image-text pairs.

This means that the dataset does not simply encode how humans see images. It also encodes how commercial platforms, search systems, and web infrastructures describe images.

### Larger Issues / Keywords

- Platform capitalism
- SEO
- Accessibility repurposed
- Commercial web logic
- Data traces

---

## 5. CLIP Similarity and Algorithmic Filtering

### Argument Chain

LAION uses CLIP to compare images and captions  
→ CLIP gives each image-text pair a similarity score  
→ pairs above a threshold are included  
→ pairs below the threshold are excluded  
→ the dataset boundary is produced by model-based scoring.

### Authors’ Emphasis

The authors emphasize that LAION-5B is not collected first and interpreted later. It is produced through algorithmic filtering from the beginning. CLIP acts as a gatekeeper: it decides whether an image and its text are similar enough to enter the dataset.

This makes the dataset dependent on another model. LAION-5B is therefore already shaped by machine vision before it becomes training data for later machine-learning systems.

### Larger Issues / Keywords

- Machine vision
- Classification power
- Algorithmic filtering
- Dataset boundaries
- Threshold politics

---

## 6. Thresholds as Hidden Cultural Decisions

### Argument Chain

Many image-text pairs sit close to LAION’s minimum CLIP threshold  
→ a tiny change in threshold can include or exclude hundreds of millions of images  
→ small technical parameters create large cultural and representational consequences.

### Authors’ Emphasis

The project shows that technical thresholds are not minor details. A small numerical adjustment can reshape the dataset at a massive scale. In this sense, a threshold becomes a form of curation.

The authors describe this as a kind of statistical curation. Instead of a human curator deciding what belongs, a model score and a cutoff value determine what becomes part of the dataset.

### Larger Issues / Keywords

- Statistical curation
- Invisible decision-making
- Technical parameters as cultural power
- Inclusion and exclusion
- Quantified judgment

---

## 7. “Models All The Way Down”

### Argument Chain

LAION uses CLIP to filter image-text pairs  
→ CLIP was itself trained on other datasets  
→ LAION’s thresholds are calibrated through benchmarks and other models  
→ those benchmarks also depend on models and datasets  
→ the dataset is built from layers of other models.

### Authors’ Emphasis

This is the project’s central conceptual claim. The dataset is not a raw foundation underneath AI models. It is already produced by other models, benchmarks, training sets, and classification systems.

The phrase “models all the way down” suggests a recursive structure: models create datasets, datasets train models, and those models then help create new datasets. Biases, omissions, and assumptions can travel through these layers and become harder to locate.

### Larger Issues / Keywords

- Model recursion
- Infrastructural opacity
- Benchmark politics
- Epistemic circularity
- Layered AI infrastructure

---

## 8. Language Classification and the Construction of Subsets

### Argument Chain

LAION-5B is divided into English, multilingual, and no-language subsets  
→ these subsets are produced by a language detection model  
→ language categories are therefore algorithmic classifications, not natural facts.

### Authors’ Emphasis

The authors show that language in LAION-5B is also model-produced. The dataset’s language subsets are not simply discovered; they are classified by another machine-learning system.

This matters because language classification affects how the dataset is used. If certain languages are overcounted, undercounted, or misclassified, the dataset’s apparent global diversity may be misleading.

### Larger Issues / Keywords

- Language hierarchy
- Classification bias
- Multilingual representation
- Cultural worldview
- Algorithmic categorization

---

## 9. English Dominance and Misclassification

### Argument Chain

Some captions are misclassified into unexpected languages  
→ English remains structurally dominant across the dataset  
→ the dataset carries an English-centered worldview even when it appears multilingual.

### Authors’ Emphasis

The project argues that LAION-5B does not represent languages equally. English is not just one language among many; it becomes the dominant framework through which the dataset organizes images and captions.

This creates a cultural imbalance. A model trained on such data may reproduce a world in which English-language categories, references, and assumptions are overrepresented.

### Larger Issues / Keywords

- Linguistic imperialism
- Cultural bias
- Representational inequality
- Global AI asymmetry
- English-centered AI

---

## 10. LAION-Aesthetics and the Scoring of Beauty

### Argument Chain

LAION creates aesthetic subsets by scoring images for visual quality  
→ these subsets are used to improve or fine-tune generative image systems  
→ “good” visual quality becomes a model score  
→ aesthetic judgment becomes part of AI infrastructure.

### Authors’ Emphasis

The authors show that aesthetics in generative AI is not neutral or universal. What counts as a “good” image can be operationalized through ratings, predictors, and subsets.

This means that AI-generated beauty is not simply discovered by the model. It is trained through particular scoring systems and cultural preferences.

### Larger Issues / Keywords

- Aesthetic standardization
- Taste as data
- Visual culture
- Generated image style
- Beauty as infrastructure

---

## 11. Aesthetic Rating Communities and Cultural Bias

### Argument Chain

Aesthetic models are trained from ratings by specific online communities  
→ those communities are culturally narrow and unevenly represented  
→ their preferences are amplified through generative AI systems.

### Authors’ Emphasis

The project suggests that the “appealing” look of some AI-generated images may be shaped by the taste of a small group of people. These groups are not representative of all users or cultures.

This reveals an important problem: when taste is transformed into training data, the preferences of a specific community can become embedded in widely used AI systems.

### Larger Issues / Keywords

- WEIRD bias
- Hidden labor
- Platform communities
- Cultural homogenization
- Aesthetic politics

---

## 12. Ownership, Safety, and Statistical Proxies

### Argument Chain

LAION includes metrics such as watermark probability and NSFW flags  
→ these metrics are generated by models  
→ they are imperfect proxies for complex legal and ethical problems  
→ safety and ownership become reduced to statistical scores.

### Authors’ Emphasis

The authors emphasize that model-generated safety metrics cannot fully resolve ethical issues. Copyright, consent, authorship, and harmful content are complex social and legal questions. Reducing them to probability scores may make them easier to process computationally, but it does not make them solved.

This is one of the project’s strongest ethical points: technical metrics can create the appearance of responsibility without actually providing accountability.

### Larger Issues / Keywords

- Copyright
- Ownership
- AI safety
- Harm mitigation
- Metricization of ethics

---

## 13. “Research Only” and the Responsibility Gap

### Argument Chain

LAION frames the dataset as research material  
→ downstream commercial systems can still use it  
→ responsibility for harmful use becomes unclear  
→ open research can still produce real-world consequences.

### Authors’ Emphasis

The authors question the gap between research framing and commercial deployment. A dataset may be released for research purposes, but once it circulates publicly, it can be used by powerful commercial systems.

The project suggests that disclaimers are not enough. If a dataset becomes part of real-world AI infrastructure, then its creators, users, and downstream developers all become part of an unresolved chain of responsibility.

### Larger Issues / Keywords

- Responsibility gap
- Open-source ethics
- Downstream harm
- Governance failure
- Research-to-industry pipeline

---

## 14. Transparency Versus Accountability

### Argument Chain

LAION is open-source  
→ this openness makes public investigation possible  
→ but openness does not automatically make the dataset safe, fair, or accountable  
→ transparency is necessary but not sufficient.

### Authors’ Emphasis

The authors do not simply reject LAION. They acknowledge that LAION’s openness is important because it allows researchers and journalists to examine the dataset. Without that openness, projects like *Models All The Way Down* would be much harder to produce.

However, transparency alone does not solve the ethical problems of dataset construction. Public access must be paired with accountability, governance, and responsibility.

### Larger Issues / Keywords

- Transparency vs accountability
- Auditability
- Public knowledge
- Open-source politics
- Accountable datasets

---

## 15. CommonPool and the Future of Dataset Scale

### Argument Chain

LAION-5B becomes unavailable after safety concerns  
→ LAION later releases an even larger dataset, CommonPool  
→ the same model-based curation logic continues at a larger scale  
→ the problem is not one dataset, but an expanding mode of data production.

### Authors’ Emphasis

The project ends by showing that the issues surrounding LAION-5B are not isolated. Even after LAION-5B becomes controversial, the broader system continues to move toward larger datasets.

This suggests that the future of AI dataset production will not simply be about more data. It will also require better methods for investigation, governance, and accountability.

### Larger Issues / Keywords

- Infrastructural acceleration
- Bigger-is-better logic
- Future AI governance
- Unresolved harms
- Dataset investigation as method

---

## Summary of the Project’s Main Argument

*Models All The Way Down* argues that LAION-5B is not a neutral collection of web images. It is a layered infrastructure produced by platforms, captions, crawlers, models, thresholds, language classifiers, aesthetic predictors, and safety metrics.

The project shows that data curation does not disappear when humans are removed from the process. Instead, curation is displaced into models, metrics, and statistical thresholds. These systems decide what enters the dataset, how images are categorized, which languages are prioritized, what counts as beautiful, and how safety or ownership risks are measured.

In this sense, the project connects technical dataset construction to larger cultural and ethical questions. It shows that AI systems inherit not only data, but also the values, biases, infrastructures, and blind spots embedded in the making of that data.

---

# Part 3: Visual and Aesthetic Representation

## Overview

The visual language of *Models All The Way Down* works like an investigation rather than a conventional data visualization dashboard. The project uses scrolling, image grids, annotations, comparisons, and a restrained archival style to make LAION-5B readable as a constructed system. Its visual form supports its argument: the dataset is not neutral or raw, but layered, filtered, scored, and shaped by many hidden infrastructures.

---

## 1. Long-form Scrolling as Layered Investigation

**Visual method → Argument:**  
Long-form scrolling structure  
→ the reader moves through Common Crawl, ALT text, CLIP scores, language detection, aesthetics, and safety metrics layer by layer  
→ the dataset is presented as a layered infrastructure, not a single object.

**What this expresses:**  
The scrolling format turns the website into an investigative journey. It reflects the authors’ position that AI datasets must be understood through their hidden layers of construction.

---

## 2. Image Grids as Evidence of Scale

**Visual method → Argument:**  
Dense image grids  
→ individual images become part of a massive visual pattern  
→ the scale, repetition, and unevenness of LAION-5B become visible.

**What this expresses:**  
The grids show that the dataset is too large to understand through single examples alone. They make scale feel concrete while also revealing patterns, repetitions, and anomalies inside the dataset.

---

## 3. Captions, Scores, and Annotations as Machine-Readable Evidence

**Visual method → Argument:**  
Image + ALT text + CLIP score + annotation  
→ the project shows how machines connect images and language  
→ algorithmic judgment becomes visible and inspectable.

**What this expresses:**  
Instead of treating CLIP scores as abstract numbers, the project places them next to images and captions. This makes machine judgment readable to humans and shows that filtering is not neutral.

---

## 4. Side-by-Side Comparison as a Way to Reveal Classification Bias

**Visual method → Argument:**  
Side-by-side comparisons of images, captions, subsets, scores, and categories  
→ differences between classifications become visible  
→ language, aesthetic, and safety categories are shown as model-produced decisions.

**What this expresses:**  
Comparison allows the reader to see how the same dataset can be reorganized by different models and thresholds. It supports the authors’ claim that classification is an active form of power.

---

## 5. Restrained Web Aesthetic as Investigative Archive

**Visual method → Argument:**  
Minimal layout, controlled typography, limited decoration, and evidence-based image placement  
→ the interface feels like a research archive or investigative report rather than a tech product  
→ the dataset is framed as evidence to be examined.

**What this expresses:**  
The restrained style avoids making AI feel magical or seamless. It reflects the authors’ critical position: the project is not selling an AI future, but examining the infrastructure behind it.

---

## 6. Visual Density as a Critique of Dataset Opacity

**Visual method → Argument:**  
Large quantities of images, scores, labels, and examples appear together  
→ the reader feels both the richness and the unreadability of the dataset  
→ scale becomes a problem of knowledge and governance.

**What this expresses:**  
The project uses visual density to show why datasets like LAION-5B are difficult to inspect. It makes clear that opacity is not only caused by secrecy, but also by overwhelming scale.

---

## 7. Aesthetic Subsets as a Critique of Taste

**Visual method → Argument:**  
Examples of aesthetic scoring and ranked image sets  
→ “visual quality” is shown as something modeled and scored  
→ beauty becomes a dataset category rather than a universal value.

**What this expresses:**  
By showing aesthetic rankings visually, the project argues that AI-generated beauty is shaped by specific communities, rating systems, and cultural preferences.

---

## 8. Visual Essay Format as Public AI Critique

**Visual method → Argument:**  
Narrative text + diagrams + image examples + data evidence  
→ technical dataset construction becomes understandable to non-specialists  
→ AI infrastructure becomes a public object of critique.

**What this expresses:**  
The project situates itself between data journalism, digital humanities, and critical AI studies. Its visual style makes complex technical systems accessible without simplifying their politics.

