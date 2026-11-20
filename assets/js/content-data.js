/* Module-Specific Content Data: L1LC03CP — Dream Park v1.0.9 (CP_01–CP_06) */
(function (global) {
  "use strict";

  global.CONTENT_DATA = {
    ilmCode: "L1LC03",
    classCode: "L1LC03CP",
    version: "1.0.9",
    moduleTitle: "Quill and Tell: The Art of Opinion Writing",
    projectTitle: "Dream Park — Interactive Park Builder & Opinion Writer",
    objective: "Learners will be able to compose persuasive opinion pieces that clearly differentiate between factual information and personal viewpoints, supporting their arguments with relevant evidence.",

    scopeSpec: {
      whatItIs: [
        "An interactive browser-based Dream Park Studio built strictly from the CP frames (CP_01–CP_06) of L1LC03.",
        "Part 1 (CP_01–CP_04): Students select 4 of the 8 storyboard park features, give their park a creative name, and arrange all 4 features on a drag-and-drop park builder canvas.",
        "Part 2 (CP_05): Students write a structured opinion piece with a title, opening opinion, 4 dedicated reason-and-example boxes (one per chosen feature), and a closing conclusion.",
        "Export & Submit (CP_06): Generates and submits a 2-page print-ready PDF (Aerial Park Blueprint + Opinion Piece) directly to Ulipsu."
      ],
      loses: [
        "Physical cardboard box or thermocol base construction (CP_03).",
        "Hands-on crafting with coloured paper, clay, and small household items (CP_03).",
        "Clicking and uploading a camera photograph of a physical tabletop model (CP_06)."
      ],
      needsDeciding: [
        "Digital Model Improvisation: Replaced the physical thermocol/craft model with a 4-zone drag-and-drop park builder and aerial SVG park renderer.",
        "Opinion Template Structure: Implemented the CP_05 template ('title, reasons, examples, and conclusion') with a dedicated reason box per chosen feature and transition-word helpers from C1/C2.",
        "PDF Export Format: Generates a 2-page PDF combining the visual park layout (Page 1) and full opinion piece (Page 2) in place of a model photo."
      ]
    },

    steps: [
      {
        id: "step1",
        frame: "CP_01–02",
        shortTitle: "1. Pick 4 Features & Name",
        title: "Step 1: Choose 4 Park Features & Name Your Dream Park",
        ost: "Step 1: Choose Your Items · Give your park a creative name",
        prompt: "Pick any 4 features from the list of 8 to make your park special, and give your Dream Park a creative name."
      },
      {
        id: "step2",
        frame: "CP_03–04",
        shortTitle: "2. Drag & Drop Park",
        title: "Step 2: Arrange Your 4 Features in the Drag-and-Drop Park Builder",
        ost: "Step 2: Create Your Model — Arrange everything to show your layout",
        prompt: "Drag and drop each of your 4 chosen features onto the 4 park zones (or click a feature and click a zone) to design your layout."
      },
      {
        id: "step3",
        frame: "CP_05",
        shortTitle: "3. Opinion Writer",
        title: "Step 3: Write Your Opinion Piece (Reason Box Per Feature)",
        ost: "Part 2: Writing About Your Park — Title, Reasons, Examples & Conclusion",
        prompt: "Explain why you chose each of your 4 features and how each one makes your park the best place to visit."
      },
      {
        id: "step4",
        frame: "CP_06",
        shortTitle: "4. Export & Submit PDF",
        title: "Step 4: Review Dream Park & Export Print-Ready PDF",
        ost: "Upload your Dream Park blueprint and opinion piece on Ulipsu (PDF)",
        prompt: "Review your completed park map and opinion essay, then download or submit your 2-page PDF to Ulipsu."
      }
    ],

    parkNameSuggestions: [
      "Sunshine Gardens",
      "Wildflower Park",
      "Happy Trails Park",
      "Greenwood Oasis"
    ],

    groundThemes: [
      { id: "meadow", name: "Sunny Meadow" },
      { id: "blossom", name: "Spring Blossom" },
      { id: "riverside", name: "Riverside Green" }
    ],

    zoneLabels: [
      { id: 0, name: "North-West Corner" },
      { id: 1, name: "North-East Corner" },
      { id: 2, name: "South-West Corner" },
      { id: 3, name: "South-East Corner" }
    ],

    transitionChips: ["First,", "Second,", "Next,", "Lastly,", "For example,"],

    features: [
      {
        id: "playground",
        name: "Playground with slides and swings",
        shortName: "Playground",
        category: "Active Fun",
        starterReason: "First, I chose a playground with slides and swings because kids love climbing and swinging with friends. For example, tall wavy slides make every afternoon exciting!"
      },
      {
        id: "flower_garden",
        name: "Flower garden",
        shortName: "Flower Garden",
        category: "Nature & Beauty",
        starterReason: "Second, a colourful flower garden makes the park look bright and smell wonderful. For example, visitors can see blooming roses, marigolds, and butterflies."
      },
      {
        id: "bike_path",
        name: "Walking and biking path",
        shortName: "Walking & Biking Path",
        category: "Fitness & Trails",
        starterReason: "Next, a smooth walking and biking path gives families a safe place to exercise. For example, children can ride bicycles while grandparents enjoy a morning walk."
      },
      {
        id: "duck_pond",
        name: "Pond with ducks",
        shortName: "Pond with Ducks",
        category: "Wildlife & Calm",
        starterReason: "In addition, a peaceful pond with ducks lets visitors watch nature up close. For example, families can relax by the water and count the ducks swimming together."
      },
      {
        id: "board_games",
        name: "Board game zone",
        shortName: "Board Game Zone",
        category: "Brain & Social",
        starterReason: "Furthermore, a board game zone is great because friends can sit together and play chess or ludo. For example, it gives kids a fun way to think and share laughs."
      },
      {
        id: "fountain_benches",
        name: "A fountain with benches around it",
        shortName: "Fountain & Benches",
        category: "Rest & Gathering",
        starterReason: "Also, a fountain with benches around it creates a cool, relaxing meeting spot. For example, families can rest on the benches and listen to the splashing water."
      },
      {
        id: "dog_park",
        name: "Dog park section",
        shortName: "Dog Park Section",
        category: "Pet Friendly",
        starterReason: "Another great feature is a dog park section where pet owners can safely bring their dogs. For example, puppies can run, fetch balls, and play with other dogs."
      },
      {
        id: "shade_trees",
        name: "Tall trees for shade",
        shortName: "Tall Shade Trees",
        category: "Cool Comfort",
        starterReason: "Finally, tall trees for shade keep the entire park cool and breezy on sunny days. For example, families can spread a picnic mat under the big green branches."
      }
    ]
  };
})(window);
