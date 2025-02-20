Usage Guide with Insite
=======================

This is a guide to show how to use NEST Desktop with Insite.


Insite is a recording backend module which is also integrated in NEST Simulator.
Basically, with Insite neuronal or network activity can be observed during the simulation.


.. note::
   Simulation with Insite needs to be run with Insite docker images
   ``nest-module`` and ``access-node``.
   The best method is to use Docker Compose, which also deploys NEST Desktop and Insite.
   For more information, please read the :doc:`deployment guide of Insite </deployer/deploy-insite>`.

|br|

.. _check-if-insite-is-running:

**Check if Insite is running**

.. image:: ../_static/img/screenshots/settings-insite.png
  :align: left
  :target: #check-if-insite-is-running

In the settings page you can check whether the Insite backend is running.

|br|

.. _enable-simulation-with-insite:

**Enable simulation with Insite**

.. image:: ../_static/img/screenshots/simulate-with-insite.png
  :align: right
  :target: #enable-simulation-with-insite

After successfully receiving a ping from the Insite Access node of the backend,
you can check the item :guilabel:`Simulate with Insite` in the context menu of
the :guilabel:`Simulate` button (opens by clicking with the right mouse button).

|br|

.. _script-code-for-simulation-with-insite:

**Script code for simulation with Insite**

The Insite module has to be loaded in the NEST kernel.
Preferentially load the Insite module directly after importing NEST.
Second, the parameter ``record_to`` of any recording device
(e.g. spike recorder, multimeter or voltmeter) has to been modified:

.. code-block:: python

  import nest
  nest.Install("insitemodule")
  ...

  recorder.set({"record_to": "insite"})
  ...

Now, the Insite recording module collects activity events from the modified recording devices.
The client receives activity from the Insite ``Access Node`` on another port (default: ``8080``).

For more information about Insite, please visit the official
`documentation of Insite <https://vrgrouprwth.github.io/insite/>`__ from the VR Group at RWTH Aachen.

|br|

**Acknowledgements**

Thanks for integrating Insite in NEST Simulator and NEST Desktop:

- Simon Oehrl (Conceptual design for Insitufication in NEST Desktop)
- Marcel Krüger (Collaboration of Insitufication in NEST Desktop)


.. |br| raw:: html

  <div style="display:inline-block; width:100%"/>
